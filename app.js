require('dotenv').config();



const getClient = require('./app/db');
const reader = require('./app/reader');



  async function main() {
  console.log('Hello world.', process.env.TEST);

  await reader();

  const client = await getClient();
  //...

  await client.close();
}

main();
