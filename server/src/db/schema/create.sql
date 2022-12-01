DROP TABLE IF EXISTS games CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS categories_sets CASCADE;
DROP TABLE IF EXISTS subcategories CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE games (
  id SERIAL PRIMARY KEY NOT NULL,
  url VARCHAR(255) NOT NULL,
  seed INTEGER NOT NULL,
  timer SMALLINT DEFAULT 60,
  max_players SMALLINT DEFAULT 8,
  rounds SMALLINT DEFAULT 3
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL, 
  title VARCHAR(255) NOT NULL
);

CREATE TABLE categories_sets (
  id SERIAL PRIMARY KEY NOT NULL,
  game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE subcategories (
  id SERIAL PRIMARY KEY NOT NULL,
  subcategory VARCHAR(255) NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
);

--              STRETCH, STORE RESULTS ETC...

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  score SMALLINT DEFAULT 0,
  color VARCHAR(255),
  game_id INTEGER REFERENCES games(id) ON DELETE SET NULL,
  avatar_url VARCHAR(255),
  host BOOLEAN DEFAULT FALSE
); 