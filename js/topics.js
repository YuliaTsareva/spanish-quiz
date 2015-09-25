'use strict';

var _ = require('underscore');

var csv = require('./csv');
var utils = require('./utils');

var topics = [
  {
    name: 'weather',
    spanish_title: 'Tiempo'
  },
  {
    name: 'geography',
    spanish_title: 'Geografía'
  },
  {
    name: 'politics',
    spanish_title: 'Política'
  },
  {
    name: 'street',
    spanish_title: 'Calle'
  }
];

function getRandom() {
  var randomTopicIndex = utils.getRandomInt(topics.length);
  return topics[randomTopicIndex];
}

function find(name) {
  return _.find(topics, t => t.name === name);
}

function loadWords(topic, next) {
  csv.read('data/' + topic.name + '.txt', function (err, data) {

    if (err) {
      console.log(err);
      return;
    }

    data = _.filter(data, item => item.spanish && item.russian);

    data = _.map(data, function (word) {
      return {
        question: word.russian,
        answer: word.spanish
      };
    });

    next(data);
  });
}

module.exports.getRandom = getRandom;
module.exports.find = find;
module.exports.loadWords = loadWords;
