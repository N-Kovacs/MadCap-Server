// load environment data from environment.js
const ENV = require('../environment');

// other dependencies
const fs = require('fs');
const chalk = require('chalk');
const db = require('../db/connection');

// PG connection setup
// const connectionString = process.env.DATABASE_URL ||
//   `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable`;
// const client = new Client();

// Loads the schema files from db/schema
const runSchemaFiles = async () => {
  console.log(chalk.cyan(`-> Loading Schema Files ...`));
  const schemaFilenames = fs.readdirSync(`./src/db/schema`);

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`./src/db/schema/${fn}`, 'utf8');
    console.log(`\t-> Running ${chalk.green(fn)}`);
    await db.query(sql);
  }
};

const runSeedFiles = async () => {
  console.log(chalk.cyan(`-> Loading Seeds ...`));
  const schemaFilenames = fs.readdirSync(`./src/db/seeds/${ENV}`);

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`./src/db/seeds/${ENV}/${fn}`, 'utf8');
    console.log(`\t-> Running ${chalk.green(fn)}`);
    await db.query(sql);
  }
};

runResetDB = async () => {
  try {
    process.env.PGHOST &&
      console.log(`-> Connecting to PG on ${process.env.PGHOST} as ${process.env.PGUSER}...`);

    await runSchemaFiles();
    await runSeedFiles();
  } catch (err) {
    console.error(chalk.red(`Failed due to error: ${err}`));
    process.exit();
  }
};

module.exports = runResetDB;