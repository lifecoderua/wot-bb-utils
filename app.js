require('dotenv').config();

const getClient = require('./app/db');
const reader = require('./app/reader');

async function main() {
  console.log('Hello world.', process.env.TEST);

  const client = await getClient();

  await reader();



  await client.close();
}

main();
