require('dotenv').config();

const getClient = require('./app/db');
const reader = require('./app/reader');
const wotClient = require('./app/wot');
const Writer = require('./app/writer');

function isPlayer(playerType) {
  return playerType === 'Игрок без клана';
}

async function main() {
  console.log('Hello world.', process.env.TEST);

  const client = await getClient();

  await reader();

  const playerStatistics = await wotClient.getPlayerStatistics('https://worldoftanks.ru/ru/community/accounts/7807670-MaXiMaLs/');
  console.log(playerStatistics);
  Writer.playerWriter(playerStatistics);

  const clanStatistics = await wotClient.getClanStatistics('Discord/someuser/0000000, https://ru.wargaming.net/clans/wot/--52472/. В свое время обучал игроков с помощью танковой академии, есть пару супер активных игроков, и пару людей которые готовы заниматься орг. вопросов.', 'https://worldoftanks.ru/ru/community/accounts/6123184-And66997/');
  console.log(clanStatistics);
  Writer.clanWriter(clanStatistics);

  await client.close();
}

main();
