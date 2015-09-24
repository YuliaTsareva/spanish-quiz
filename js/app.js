'use strict';

var _ = require('underscore');

var config = require('./config');
var topics = require('./topics');

var React = require('react');
var Quiz = require('./components/Quiz');

function selectGame() {

	var allWords = _.map(this, function(word) {
		return {
			spanish: word.spanish,
			question: word.meaning || word.russian
		};
	});

	var questionsCount = Math.min(allWords.length, config.maxQuestionsCount);

	var questions = _.map(_.shuffle(allWords).slice(0, questionsCount), function(q) {

		var options = [{spanish: q.spanish}];

		var possibleOptions = _.map(_.filter(allWords, function(w) {

			return w.question !== q.question;
		}), function(w) {

			return {spanish: w.spanish};
		});

		options = options.concat(_.shuffle(possibleOptions).slice(0, config.optionsCount - 1));

		return {

			question: q.question,
			answer: q.spanish,
			options: _.shuffle(options)
		};
	});

	return {

		questionsCount: questionsCount,
		questions: questions,

		checkAnswer: (question, selectedWord) => {

			var sameWord = _.find(allWords, function(w) {
				return w.question === question && w.spanish === selectedWord;
			});
			return sameWord ? true : false;
		}
	};
}

topics.selectRandom(function(data) {
	data.selectGame = selectGame;

	React.render(
		<Quiz data={data}/>,
		document.getElementById('app')
	);
});
