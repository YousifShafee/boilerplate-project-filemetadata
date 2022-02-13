var express = require('express');
var cors = require('cors');
var multer = require('multer');
require('dotenv').config()

var app = express();
var upload = multer({ dest: 'upload/' });
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

var type = upload.single('upfile');

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', type, (req, res) => {
  var upload_file = req.file
  try {
    res.json(
      { 
        "name": upload_file.originalname,
        "type": upload_file.mimetype,
        "size": upload_file.size 
      }
    )
  } catch {
    res.json({error : "There Is Error"})
  }
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
