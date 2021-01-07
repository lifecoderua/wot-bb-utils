require('dotenv').config();

const getClient = require('./app/db');
const reader = require('./app/reader');
const wotClient = require('./app/wot');

async function main() {
  console.log('Hello world.', process.env.TEST);

  const client = await getClient();

  // await reader();

  // const playerStatistics = await wotClient.getPlayerStatistics('https://worldoftanks.ru/ru/community/accounts/7807670-MaXiMaLs/');
  // console.log(playerStatistics);



  await client.close();
}

main();
