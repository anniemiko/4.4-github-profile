var $ = window.$ = window.jQuery = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var githubtoken = require('./gitapikey.js');
var octicons = require("octicons");
var bootstrap = require('bootstrap-sass');

// Send auth token to github if token is provided
if(githubtoken !== undefined){
  $.ajaxSetup({
    headers: {
      'Authorization': 'token ' + githubtoken.token
    }
  });

}

var source = $("#sidebar-template").html();
console.log(source);
var template = Handlebars.compile(source);

$.ajax('https://api.github.com/users/anniemiko').done(function(data){
 console.log(data)
   var content = {
     avatarUrl: data.avatar_url,
     name: data.name,
     bio: data.bio,
     location: data.location,
     email: data.email,
     htmlUrl: data.html_url,
     created: data.created_at,
     logIn: data.login,
     orgs: data.organizations_url,
 }

  $('#sidebar').append(template(content));
  console.log($('#sidebar'));
});


$.ajax('https://api.github.com/users/anniemiko/repos').done(function(data){
  ar content = {
    repo: data.repo,
  }

   $('#sidebar').append(template(content));
   console.log($('#sidebar'));
 });
