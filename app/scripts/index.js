var $ = window.$ = window.jQuery = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var githubtoken = require('./gitapikey.js');
var octicons = require("octicons");

// Send auth token to github if token is provided
if(githubtoken !== undefined){
  $.ajaxSetup({
    headers: {
      'Authorization': 'token ' + githubtoken.token
    }
  });

}

$.ajax('https://api.github.com/users/anniemiko').done(function(data){
 console.log(data)
 // var content = {
 //   avatarUrl: data.avatar_url,
 //   name: data.name,
 //   bio: data.bio,
 //   location: data.location,
 //   email: data.email,
 //   htmlUrl: data.html_url,
 //   created: data.created_at,
 //   logIn:data.login,
 //   orgs: data.organizations,
});

// $('.dropdown-toggle').dropdown()
