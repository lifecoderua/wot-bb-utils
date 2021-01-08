require('dotenv').config();

// const getClient = require('./app/db');
const reader = require('./app/reader');
const wotClient = require('./app/wot');
const Writer = require('./app/writer');

function isPlayer(playerType) {
  return playerType === 'Игрок без клана';
}

async function main() {
  console.log('Hello world.', process.env.TEST);

  // const client = await getClient();

  const records = await reader();

  // console.log(records);

  let activeRow = 0;

  for (const record of records) {
    const [timeCode, playerType, playerLink, clanLink, spyTest] = record;

    console.log('Parsing row', activeRow++);
    // console.log('>>', timeCode, playerType, playerLink, clanLink, spyTest);

    if (isPlayer(playerType)) {
      // const playerStatistics = await wotClient.getPlayerStatistics(playerLink);
      // console.log(playerStatistics);
      // Writer.playerWriter(playerStatistics);
    } else {
      const clanStatistics = await wotClient.getClanStatistics(clanLink, playerLink);
      clanStatistics.contact = clanLink;
      // console.log(clanStatistics);
      Writer.clanWriter(clanStatistics);
    }
  }


  // await client.close();
}

main();
