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
  return client.get('https://api.worldoftanks.ru/wot/clans/info/', {
    params: {
      // account_id: account_id.join(','),
      clan_id,
      application_id: process.env.WOT_APP_ID,
    },
  });
}

function getClanRating(clan_id) {
  return client.get('https://api.worldoftanks.ru/wot/clanratings/clans/', {
    params: {
      // account_id: account_id.join(','),
      clan_id,
      application_id: process.env.WOT_APP_ID,
    },
  });
}

async function getClanStatistics(clanLink, playerLink = '') {
  try {
    const clan_id = clanLink.match(/clans\/wot\/(\d+)/)[1];

    const clanInfo = await getClanInfo(clan_id);

    const { data } = await getClanRating(clan_id);

    const clanInfoContent = clanInfo.data.data[clan_id];

    const clan = data.data[clan_id];

    const statistics = {
      clan_id,
      clan_tag: clan.clan_tag,
      clan_name: clan.clan_name,

      clan_leader_id: clanInfoContent.leader_id,
      clan_leader_name: clanInfoContent.leader_name,

      wins_ratio_avg: clan.wins_ratio_avg.value,

      valid: true,
      submitted_by_leader: playerLink.indexOf(clanInfoContent.leader_id) !== -1,
    }

    return statistics;
  } catch (e) {
    console.log('Fetch clan data failed for', clanLink);
  }
}

module.exports = {
  getPlayerInfo,
  getPlayerStatistics,
  getClanStatistics,
}
