CREATE TABLE IF NOT EXISTS companies (
    id INTEGER PRIMARY KEY,
    railroad_id INTEGER,
    name_normal TEXT,
    name_kana TEXT,
    name_long TEXT,
    name_short TEXT,
    url TEXT,
    type INTEGER,
    status INTEGER,
    sort INTEGER
)
