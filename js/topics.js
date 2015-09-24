'use strict';

var _ = require('underscore');
var csv = require('./csv');
var utils = require('./utils');

var topics = [
  {
    filename: 'weather.txt',
    title: 'Tiempo'
  },
  {
    filename: 'geography.txt',
    title: 'Geografía'
  }
];

function selectRandom(next) {

  var randomTopicIndex = utils.getRandomInt(topics.length);

  csv.read('data/' + topics[randomTopicIndex].filename, function (err, data) {

    if (err) {
      console.log(err);
      return;
    }

    data = _.filter(data, item => item.russian);

    next(data);
  });
}

module.exports.selectRandom = selectRandom;
