const stringify = require('csv-stringify/lib/sync');
const fs = require('fs');

const PLAYER_FILE = './data/players.csv';
const CLAN_FILE = './data/clans.csv';

const options = {
  header: false,
};

function playerWriter(record) {
  const data = stringify([record], {
    ...options,
    columns: [
      { key: 'accountId', header: 'accountId' },
      { key: 'nickname', header: 'nickname' },
      { key: 'wins_ratio_avg', header: 'wins_ratio_avg' },
      { key: 'wins_bracket', header: 'wins_bracket' },
      { key: 'valid', header: 'valid' },
    ]
  });

  fs.writeFileSync(PLAYER_FILE, data, {
    flag: 'a',
  });
}

function clanWriter(record) {
  const data = stringify([record], {
    ...options,
    columns: [
      { key: 'clan_id', header: 'clan_id' },
      { key: 'clan_tag', header: 'clan_tag' },
      { key: 'free_members', header: 'free_members' },
      { key: 'wins_ratio_avg', header: 'wins_ratio_avg' },
      { key: 'wins_bracket', header: 'wins_bracket' },
      { key: 'valid', header: 'valid' },
      { key: 'submitted_by_leader', header: 'submitted_by_leader' },
      { key: 'clan_name', header: 'clan_name' },
      { key: 'clan_leader_id', header: 'clan_leader_id' },
      { key: 'clan_leader_name', header: 'clan_leader_name' },
      { key: 'contact', header: 'contact' },
    ]
  });

  fs.writeFileSync(CLAN_FILE, data, {
    flag: 'a',
  });
}


module.exports = {
  playerWriter,
  clanWriter
}
