'use strict';

var _ = require('underscore');
var React = require('react');

var csv = require('./csv');
var Quiz = require('./components/Quiz');

function selectGame() {
	var words = _.map(_.shuffle(this, []).slice(0, 4), w => _.clone(w));

	var answer = words[_.random(words.length - 1)];

	return {
		words: words,
		question: answer.russian,
		checkAnswer: selectedWord => selectedWord === answer.spanish
	};
}

csv.read('../data/sueña5.txt', function (err, data) {

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
