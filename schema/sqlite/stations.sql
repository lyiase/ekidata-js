CREATE TABLE IF NOT EXISTS stations (
    id INTEGER PRIMARY KEY,
    group_id INTEGER,
    name_normal TEXT,
    name_kana TEXT,
    name_romaji TEXT,
    line_id INTEGER,
    prefecture INTEGER,
    postcode TEXT,
    address TEXT,
    longitude REAL,
    latitude REAL,
    open_date TEXT,
    close_date TEXT,
    status INTEGER,
    sort INTEGER
)
