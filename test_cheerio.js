const async = require("async");
const request = require("request");
const fs = require("fs");
const cheerio = require('cheerio')

const urls = [
  {
    name:'murad',
    url:"http://rov.wikia.com/wiki/Murad"
  },
  {
    name:'zuka',
    url:"http://rov.wikia.com/wiki/Zuka"
  }

]

let i = 0;

const queue = async.queue((task, callback) => {
  request(task.url, (error, response, body) => {
      const $ = cheerio.load(body)
      const text = $('#mw-content-text p').text()

    fs.writeFile( task.name + ".txt", text, err => {
      if (err) {
        console.log(err);
        callback();
      }
      console.log("save file complete");
      callback();
    });
  });
}, 1);

queue.drain = () => {
  console.log("Complete");
};

queue.push(urls);
