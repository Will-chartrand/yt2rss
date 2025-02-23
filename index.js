const http = require('http');
const express = require('express');
const path = require('path');

app = express();

const cp = require('child_process');

app.use(express.static('public'));

app.get('/yt2rss', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/getRSS', (req, res) => {
  var child = cp.spawn('./youtuberss', [req.query.channelURL]);
  child.stdout.on('data', (data) => {
    res.send("https://www.youtube.com/feeds/videos.xml?channel_id=" + data.toString());
  });

});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
