var Twitter = require('twitter');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('9f2003250bd44ad3b345fdd6edc33b11');

/* 9f2003250bd44ad3b345fdd6edc33b11 */
var client = new Twitter({
  consumer_key: 'Lk34iDCorgzinSF7VUzhvnGL4',
  consumer_secret: 'UDn36clWYZ58DpVEv6OU5xSdiV1UXBCV3U6UR7OXBvYVItJKVu',
  access_token_key: '1019371626020921344-wvrQTHnO69FgWSjUhOZjD2shcMv8Ho',
  access_token_secret: 'rMi8eBZYEAf7PZcdl02SjESSKXVh1GlzwaXY0RJVLmDAS'
});

var params = {screen_name: 'nodejs'};

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  	tweetThis();
  }
});


var tags = ['#Technology', '#Business'];




function tweetThis(){

        newsapi.v2.everything({
          q: 'Technology',
          language: 'en',
          sortBy: 'publishedAt',
        }).then(response => {
          response.articles.forEach(function(e, index) {
              setTimeout(function(){ 
                tweet(e.description, e.url);
              }, index * 300000);
          });

});




function tweet(title, link){
  var randomTag = Math.floor(Math.random()*tags.length);
  if(title.length > 150) title = title.substring(0,150);

  var twety = title + ' ' + tags[randomTag] + ' ' + link;
  console.log(twety);
      client.post('statuses/update', {status: twety}, function(error, tweet, response) {
        if (!error) {
          console.log("done");
        }
    });

}






	/*
		client.post('statuses/update', {status: 'I am a tweet'}, function(error, tweet, response) {
			  if (!error) {
			    console.log(tweet);
			  }
		});
	*/
}