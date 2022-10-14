# ekidata-js
ekidata.jp for JavaScript

# Build BigQuery

## Install YAML to 
```
npm install -g js-yaml-cli
```

```
yaml2json -o ./schema/bigquery/companies.json ./schema/bigquery/companies.yaml
yaml2json -o ./schema/bigquery/lines.json ./schema/bigquery/lines.yaml
yaml2json -o ./schema/bigquery/joins.json ./schema/bigquery/prefectures.yaml
yaml2json -o ./schema/bigquery/prefectures.json ./schema/bigquery/prefectures.yaml
yaml2json -o ./schema/bigquery/stations.json ./schema/bigquery/stations.yaml
```

## Insert Tables (BigQuery)
```
node import-bigquery.js
```

## Create Tables (BigQuery)

```
bq mk --table ekidata.companies ./schema/bigquery/companies.json
bq mk --table ekidata.joins ./schema/bigquery/joins.json
bq mk --table ekidata.lines ./schema/bigquery/lines.json
bq mk --table ekidata.stations ./schema/bigquery/stations.json
```

## Delete Tables (BigQuery)

```
bq rm --table ekidata.companies
bq rm --table ekidata.joins
bq rm --table ekidata.lines
bq rm --table ekidata.stations
```

## Thanks
* 