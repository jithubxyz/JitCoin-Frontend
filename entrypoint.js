const isDev =require('electron-is-dev');

require('electron-compile')
  .init(__dirname, './main', !isDev);
