module.exports = (api) => {
  api.cache(false);
  return {
    presets: [['@babel/preset-env', { modules: false }], ['@babel/preset-react', { runtime: 'automatic' }]],
    plugins: ['./babel-plugin-transform-scss-modern.cjs'],
  };
};
