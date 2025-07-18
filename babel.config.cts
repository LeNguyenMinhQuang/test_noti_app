module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "babel-plugin-styled-components",
      // Đảm bảo plugin này được liệt kê.
      // Nếu bạn có các plugin khác, hãy giữ chúng ở đây.
    ],
  };
};
