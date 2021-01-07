module.exports = function getBracket(winRate) {
  if (winRate >= 60) { return 4; }
  if (winRate >= 55) { return 3; }
  if (winRate >= 51) { return 2; }
  if (winRate >= 48) { return 1; }
  return 0;
}
