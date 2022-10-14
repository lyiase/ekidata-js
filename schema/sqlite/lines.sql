CREATE TABLE IF NOT EXISTS lines (
    id INTEGER PRIMARY KEY,
    company_id INTEGER,
    name_normal TEXT,
    name_kana TEXT,
    name_long TEXT,
    colour_hex TEXT,
    colour_text TEXT,
    line_type INTEGER,
    longitude REAL,
    latitude REAL,
    zoom TEXT,
    status INTEGER,
    sort INTEGER
)
