'use strict';

import fs from 'fs';
import glob from 'glob';
import { program, Option } from 'commander';
import { parse } from 'csv-parse/sync';
import { BigQuery } from '@google-cloud/bigquery';


const CSV_PATH_COMPANIES = glob.sync('csv/company*').pop(); // 'csv/station20220921free.csv' or undefined
const CSV_PATH_JOINS = glob.sync('csv/join*').pop(); // 'csv/station20220921free.csv' or undefined
const CSV_PATH_LINES = glob.sync('csv/line*').pop(); // 'csv/station20220921free.csv' or undefined
const CSV_PATH_STATIONS = glob.sync('csv/station*').pop(); // 'csv/station20220921free.csv' or undefined

const SCHEMA_PATH_BASE = 'schema/bigquery/';

const DEFAULT_DATASET_ID = process.env.EKIDATA_BIGQUERY_DATASET_ID || 'ekidata';

const insertTable = async (row, tableId, datasetId = DEFAULT_DATASET_ID) => {
  const bigquery = new BigQuery();
  const dataset = bigquery.dataset(datasetId);
  const table = dataset.table(tableId);
  
  for( const k of Object.keys(row) ) {
    // DateTime -> BigQuery DateTime
    if (row[k] instanceof Date) {
      const ymd = `${row[k].getFullYear()}-${row[k].getMonth()+1}-${row[k].getDate()}`;
      row[k] = bigquery.date(ymd);
    }
    
    // Empty Value to null
    if (row[k] === '') {
      row[k] = null;
    }
  }

  await table.insert(row);
}

const columnNamesFromSchemaFile = (path) => {
  const columns = JSON.parse(fs.readFileSync(path, 'utf8'));
  return columns.map(col => col.name);
};

const importEkidata = async (csvPath, tableId, filter = record => record, datasetId = DEFAULT_DATASET_ID) => {
  const csvString = fs.readFileSync(csvPath, 'utf8');
  const records = parse(csvString, {
    columns: columnNamesFromSchemaFile(SCHEMA_PATH_BASE + tableId + '.json'),
    skip_empty_lines: true
  });
  
  // 最初の行はヘッダなので抜く
  records.shift();
  
  console.log(records[0]);
  for(const record of records) {
    await insertTable(filter(record), tableId, datasetId);
  }
}

// 駅名が一般名称が異なる場合があるのを補正する
const filterEkidataStationRecord = (record) => {
  const replaceMap = {
    '押上〈スカイツリー前〉': '押上',
    '押上（スカイツリー前）': '押上',
    '明治神宮前〈原宿〉': '明治神宮前',
    '獨協大学前〈草加松原〉': '獨協大学前',
  }
  
  record[2] = replaceMap[ record[2] ] || record[2];
  
  return record;
}

await importEkidata(CSV_PATH_COMPANIES, 'companies');
await importEkidata(CSV_PATH_JOINS, 'joins');
await importEkidata(CSV_PATH_LINES, 'lines');
await importEkidata(CSV_PATH_STATIONS, 'stations', filterEkidataStationRecord);
