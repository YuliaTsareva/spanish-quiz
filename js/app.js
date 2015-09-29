'use strict';

var _ = require('underscore');

var utils = require('./utils');
var topics = require('./topics');
var QuestionSet = require('./model/QuestionSet').QuestionSet;

var React = require('react');
var Quiz = require('./components/Quiz');

var topic = topics.find(utils.getUrlHash());

if (!topic) {
  topic = topics.getRandom();
  window.location.hash = topic.name;
}

topics.loadWords(topic, function (topicWords) {

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
