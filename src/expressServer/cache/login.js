const React = require('react');

const requireJSX = require('express-engine-jsx/require');

const Context = require('express-engine-jsx/Context');

module.exports = function (props, context) {
  var locals = context && context.locals || {};
  var __components = [];
  with (locals) {
    with (props) {
      __components.push(React.createElement("html", {
        lang: lang
      }, React.createElement("body", null, React.createElement("div", {
        className: "container"
      }, React.createElement("div", {
        id: "titleBar"
      }, React.createElement("div", {
        id: "title"
      }, name)), React.createElement("a", {
        href: "/login/facebook"
      }, "Log In with Facebook"), React.createElement("br", null), React.createElement("a", {
        href: "/login/google"
      }, "Log In with Google"), React.createElement("br", null), React.createElement("a", {
        href: "/login/twitter"
      }, "Log In with Twitter"), React.createElement("br", null)))));
    }
  }
  return __components;
};

module.exports.contextType = Context;