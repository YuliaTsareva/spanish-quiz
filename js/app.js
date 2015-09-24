'use strict';

var _ = require('underscore');

var config = require('./config');
var topics = require('./topics');
var QuestionSet = require('./model/QuestionSet').QuestionSet;

var React = require('react');
var Quiz = require('./components/Quiz');

topics.selectRandom(function (topicWords) {

  var data = {
    selectGame: function() {
      return QuestionSet.create(topicWords);
    }
  };

  React.render(
    <Quiz data={data}/>,
    document.getElementById('app')
  );
});
