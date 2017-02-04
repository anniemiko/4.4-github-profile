var $ = window.$ = window.jQuery = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var githubtoken = require('./gitapikey.js');
var octicons = require("octicons");
var bootstrap = require('bootstrap-sass');
var moment = require('moment');

// Send auth token to github if token is provided
if(githubtoken !== undefined){
  $.ajaxSetup({
    headers: {
      'Authorization': 'token ' + githubtoken.token
    }
  });

}

var source = $("#sidebar-template").html();
// console.log(source);
var template = Handlebars.compile(source);

$.ajax('https://api.github.com/users/anniemiko').done(function(data){
 // console.log(data);
   var content = {
     avatarUrl: data.avatar_url,
     name: data.name,
     bio: data.bio,
     location: data.location,
     email: data.email,
     htmlUrl: data.html_url,
     created: data.created_at,
     logIn: data.login,
     orgs: data.organizations_url
 }

  $('#sidebar').append(template(content));
});

var repoSource = $("#repos-template").html();
// console.log(repoSource);
var templateRepo = Handlebars.compile(repoSource);

$.ajax('https://api.github.com/users/anniemiko/repos').done(function(data){
  // console.log(data);

  var sortedData =  _.sortBy(data,"updated_at").reverse();
  // console.log(sortedData);

  _.each(sortedData, function(repos){
    // console.log(repos);
    var content = {
      name: repos.name,
      language: repos.language,
      updated: moment(repos.updated_at).fromNow()
    };

    $('#repositories').append(templateRepo(content));
    // console.log($('#repositories'));

  });


  });



 var dropdownSource = $("#dropdown-template").html();
 // console.log(dropdownSource);
 var templateDD = Handlebars.compile(dropdownSource);

 $.ajax('https://api.github.com/users/anniemiko').done(function(data){
  //  console.log(data);
     var content = {
       avatar: data.avatar_url,
       profile: data.html_url,
       stars: data.starred_url,
       logIn: data.login,
     };

     $('#avatar-dropdown').append(templateDD(content));
   });

  //  adding sticky navbar - http://stackoverflow.com/questions/1216114/how-can-i-make-a-div-stick-to-the-top-of-the-screen-once-its-been-scrolled-to

  var navbarSource = $("#staticbar-template").html();
  var templateSB = Handlebars.compile(navbarSource);

  $.ajax('https://api.github.com/users/anniemiko').done(function(data){
    console.log(data);
      var content = {
        repoNum: data.public_repos,
        starNum: data.starred_url.length,
        followersNum: data.followers,
        followingNum: data.following,
      };

      $('.staticbar').append(templateSB(content));
    });

  function moveScroller() {
    var $anchor = $("#scroller-anchor");
    var $scroller = $('#scroller');

    var move = function() {
        var st = $(window).scrollTop();
        var ot = $anchor.offset().top;
        if(st > ot) {
            $scroller.css({
                position: "fixed",
                top: "0px"
            });
        } else {
            if(st <= ot) {
                $scroller.css({
                    position: "relative",
                    top: ""
                });
            }
        }
    };
    $(window).scroll(move);
    move();
}

$(function() {
    moveScroller();
  });
