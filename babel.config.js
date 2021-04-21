module.exports = {
  presets: [['@babel/preset-env',
    {
      targets:
         { node: 'current' },
    }]],
};
// eslint-disable-next-line max-len
// jest corre, primero pasa los archivos de .js por babel, que generan archivos de .js con js adecuado para node
// y luego corre los test sobre el js optimizado para node
