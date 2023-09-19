module.exports = (lengthOfString) => {
  var p = "abcdefghijklmnopqrstuvwxyz0123456789";
  return [...Array(lengthOfString)].reduce(
    (a) => a + p[~~(Math.random() * p.length)],
    ""
  );
};
