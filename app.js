require('dotenv').config();

getClient = require('./app/db');

async function main() {
  console.log('Hello world.', process.env.TEST);

  const client = await getClient();
  //...

  await client.close();
}

main();
