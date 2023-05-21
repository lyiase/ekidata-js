import fs from 'fs';
import { program, Option } from 'commander';
import glob from 'glob';

const DB_PATH = 'db/ekidata.sqlite'

const CSV_PATH_COMPANIES = glob.sync('csv/company*').pop(); // 'csv/station20220921free.csv' or undefined
const CSV_PATH_JOINS = glob.sync('csv/join*').pop(); // 'csv/station20220921free.csv' or undefined
const CSV_LINES = glob.sync('csv/line*').pop(); // 'csv/station20220921free.csv' or undefined
const CSV_STATION = glob.sync('csv/station*').pop(); // 'csv/station20220921free.csv' or undefined

const SQL_COMPANIES = {
    table: fs.readFileSync('schema/sqlite/companies.sql', 'utf8'),
    insert: `INSERT INTO companies (id, railroad_id, name_normal, name_kana, name_long, name_short, url, type, status, sort) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
};

const SQL_JOINS = {
    table: fs.readFileSync('schema/sqlite/joins.sql', 'utf8');,
    insert: `INSERT INTO joins (line_id, station_id1, station_id2) VALUES (?, ?, ?)`,
};

const SQL_LINES = {
    table: fs.readFileSync('schema/sqlite/lines.sql', 'utf8');,
    insert: `INSERT INTO lines (id, company_id, name_normal, name_kana, name_long, colour_hex, colour_text, line_type, longitude, latitude, zoom, status, sort) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
};

const SQL_STATIONS = {
    table: fs.readFileSync('schema/sqlite/stations.sql', 'utf8');,
    insert: `INSERT INTO stations ( id, group_id, name_normal, name_kana, name_romaji, line_id, prefecture, postcode, address, longitude, latitude, open_date, close_date, status, sort ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
};

const packageJson = JSON.parse(fs.readFileSync('./package.json'));

const errorExit = (msg) => {
  console.error(msg);
  process.exit(1);
};

// TODO
// Nope