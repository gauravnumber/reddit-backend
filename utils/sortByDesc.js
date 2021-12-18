const sortByDesc = (key) => {
  return (a, b) => (a[key] < b[key]) ? 1 : ((b[key] < a[key]) ? -1 : 0);
};

module.exports = sortByDesc
