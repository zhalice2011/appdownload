var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/appusepdf', function(req, res, next) {
    res.render('appusepdf', { title: 'appusepdf' });
});
router.get('/appusevideo', function(req, res, next) {
res.render('appusevideo', { title: 'appusepdf' });
});

// 实现文件下载。
router.get('/file/:fileName', function(req, res, next) {
  // 实现文件下载 
  var fileName = req.params.fileName;
  var filePath = path.join(__dirname, "../public",fileName);
  var stats = fs.statSync(filePath); 
  if(stats.isFile()){
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': 'attachment; filename='+fileName,
      'Content-Length': stats.size
    });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.end(404);
  }
});

module.exports = router;
