var app = require('app');
var BrowserWindow = require('browser-window');
var PouchDB = require('pouchdb');

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
    
      var db = new PouchDB('mydb-idb',{db: require('memdown')});
     
      var remote = new PouchDB('http://127.0.0.1:5984/test_sync');

      db.post({
          name: 'Peter',
          age: 17
      }).then(function (response) {
            db.sync(remote).on('complete', function (info) {
                console.log("Synced!");
            });
      });
    
    
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function() { mainWindow = null });
});

