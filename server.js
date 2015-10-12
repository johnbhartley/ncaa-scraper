var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var url;
var teams = [];
var images = [];

// app.use(express.methodOverride());
// app.use(express.bodyParser());

app.set('view engine', 'ejs');


app.get('/scrape', function (req, res) {
  url = 'http://www.foxsports.com/college-football/schedule?season=2015&seasonType=1&week=7&group=0';

  request( url, function (error, response, html) {
    if(!error && response.statusCode === 200) {
      //console.log(html);
      var $ = cheerio.load(html);

      // // var game, day, team1, team2;

      // // var json = { game: "", day: "", team1: "", team2: ""};
      // // console.log('hey');
      // // 
      
      $('.wisfb_fullTeamStacked').each(function(i, elem) {
        var number = $(this).children('span').text();
        var location = $(this).children('.wisfb_fullLocation').text();
        //var team = $(this).children('span');
        //var img = $(this).children('img');
        //img = img[0];
        
        //console.log(img);
        teams[i] = number + ' ' + location;
      });

      $('.wisfb_fullTeamStacked img').each(function(i, elem) {
        var src = $(this).attr('src');
        //console.log(src);
        images[i] = src;
      });

      //var score = $('.wisfb_teamInfo').html();
      //console.log(teams, images);
      //   console.log($(this).text());
      //   //console.log($(this).children('.abbrev').text());
      // });




      // //$('.isLeadTopStory h1').filter(function () {
      // // $('.isLeadTopStory h1').filter(function () {
      // //   console.log('in lead');
      // //   var data = $(this);
      // //   game = data.text();
      // //   console.log(data);
      // //   json.game = game;

      // // });
      

      // // fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

      // //     console.log('File successfully written! - Check your project directory for the output.json file');

      // // })
      // // 
      var output = '';

      teams.forEach(function (el, i) {
        if(i % 2 === 0) {
          output += '<div class="game">';
        }
        output += '<div class="team">';
        output += '<img src="' + images[i] + '" />';
        output += el;
        output += '</div>';
        //console.log('log el' + el);
        //console.log('log i' + i);

        if(i % 2 != 0) {
          output += '</div><!-- close game -->'
        }
      });
      // 
      res.render('index', {body: output});
      //res.send(output);

    } else {
      console.log(error);
    }
  });

  //res.send('Check your console!')
  //res.send(images, teams);

});





app.listen('8181');

console.log('Magic happens on port 8181');

exports = module.exports = app;