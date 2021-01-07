const client = require('axios');


function getPlayerInfo(account_id) {
  return client.get('https://api.worldoftanks.ru/wot/account/info/', {
    params: {
      // account_id: account_id.join(','),
      account_id,
      application_id: process.env.WOT_APP_ID,
    },
  });
}

async function getPlayerStatistics(accountLink) {
  try {
    const account_id = accountLink.match(/\d+/)[0];

    const {data} = await getPlayerInfo(account_id);

    // console.log(data);

    const player = data.data[account_id];

    const stats = {
      accountId: account_id,
      nickname: player.nickname,
      allBattles: player.statistics.all.battles,
      wins: player.statistics.all.wins,
      winrate: Math.round(100 * player.statistics.all.wins / player.statistics.all.battles),

      battle_avg_xp: player.statistics.all.battle_avg_xp,
      hits_percents: player.statistics.all.hits_percents,
      valid: true,
    };

    return stats;
  } catch (e) {
    console.log('Fetch failed for', accountLink);

    return {
      accountId: accountLink,
      winrate: 0,
      valid: false,
    }
  }

}

function getClanInfo(clan_id) {

}

module.exports = {
  getPlayerInfo,
  getPlayerStatistics,

}
