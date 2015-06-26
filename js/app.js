'use strict';

var _ = require('underscore');
var React = require('react');

var csv = require('./csv');
var Quiz = require('./components/Quiz');

var MAX_QUESTIONS_COUNT = 10;
var OPTIONS_COUNT = 4;

function selectGame() {

	var allWords = this;

	var questionsCount = Math.min(allWords.length, MAX_QUESTIONS_COUNT);

	var questions = _.map(_.shuffle(allWords).slice(0, questionsCount), function(q) {

		var options = [{spanish: q.spanish}];

		var possibleOptions = _.map(_.filter(allWords, function(w) {

			return w.russian !== q.russian;
		}), function(w) {

			return {spanish: w.spanish};
		});

		options = options.concat(_.shuffle(possibleOptions).slice(0, OPTIONS_COUNT - 1));

		return {

			question: q.russian,
			options: _.shuffle(options)
		};
	});

	return {

		questionsCount: questionsCount,
		questions: questions,

		checkAnswer: (question, selectedWord) => {

			var sameWord = _.find(allWords, function(w) {
				return w.russian === question && w.spanish === selectedWord;
			});
			return sameWord ? true : false;
		}
	};
}

csv.read('../data/el_tiempo.txt', function (err, data) {

	if (err) {
		console.log(err);
		return;
	}

	data.selectGame = selectGame;

	React.render(
		<Quiz data={data}/>,
		document.getElementById('app')
	);
});
