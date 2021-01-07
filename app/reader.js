const fs = require('fs').promises;
const parse = require('csv-parse/lib/sync');

module.exports = async function reader(target) {
  const content = await fs.readFile(`./data/${process.env.DATA_FILE}`);
  const records = parse(content);

  records.shift();

  return records;
}
