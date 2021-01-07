require('dotenv').config();


getClient = require('./app/db');


async function main() {
  console.log('Hello world.', process.env.TEST);

  await getClient();
}

main();
