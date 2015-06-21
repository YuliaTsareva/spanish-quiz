/** @jsx React.DOM */
(function() {
	'use strict';

	var _ = require('underscore');
	var React = require('react');
	var csv = require('./csv');

	var Quiz = React.createClass({
		propTypes: {
			data: React.PropTypes.array.isRequired
		},
		getInitialState: function () {
			return this.props.data.selectGame();
		},
		handleWordSelected: function(word) {
			var isCorrect = this.state.checkAnswer(word);

			if (isCorrect) {

				var that = this;

				setTimeout(function() {
					that.setState(that.getInitialState());
				}, 1000);
			}

			var selected = _.find(this.state.words, function(w) {
				return w.spanish === word;
			});
			selected.isCorrect = isCorrect;

			this.setState({
				words: this.state.words
			});
		},
		render: function() {

			return <div className='quiz'>
				<h3 className='question'>{this.state.question}</h3>
				{this.state.words.map(function(word) {
					return <div>{word.isCorrect}
						<Word word={word.spanish} isCorrect={word.isCorrect} onWordSelected={this.handleWordSelected} /></div>;
				}, this)}
			</div>;
		}
	});

	var Word = React.createClass({
		propTypes: {
			word: React.PropTypes.string.isRequired,
			onWordSelected: React.PropTypes.func.isRequired
		},
		getInitialState: function () {
			return {
				attemptClass: ''
			};
		},
		handleClick: function() {
			this.props.onWordSelected(this.props.word);
		},
		getButtonClass: function() {
			if (this.props.isCorrect) {
				return 'btn-success';
			}
			if (this.props.isCorrect === false) {
				return 'btn-danger';
			}
			return '';
		},
		render: function() {
			return <input type='button'
			              className={'btn btn-default btn-lg btn-block ' + this.getButtonClass()}
			              value={this.props.word}
			              onClick={this.handleClick} />;
		}
	});

	function selectGame() {
		var words = _.map(_.shuffle(this, []).slice(0, 4), function(w) {
			return _.clone(w);
		});

		var answer = words[_.random(words.length - 1)];

		return {
			words: words,
			question: answer.russian,
			checkAnswer: function(selectedWord) {

				return selectedWord === answer.spanish;
			}
		};
	}

	csv.read('data/sueña5.txt', function(err, data) {

		if (err) {
			console.log(err);
			return;
		}

		data.selectGame = selectGame;

		React.render(
			<Quiz data={data} />,
			document.getElementById('app')
		);
	});
})();
