
var _ = require('underscore');
var React = require('react');

var Word = require('./Word');

class Quiz extends React.Component {

	constructor(props) {
		super(props);

		this.handleWordSelected = this.handleWordSelected.bind(this);
		this.createInitialState = this.createInitialState.bind(this);

		this.state = this.createInitialState();
	}

	createInitialState() {
		return this.props.data.selectGame();
	}

	handleWordSelected(word) {
		var isCorrect = this.state.checkAnswer(word);

		if (isCorrect) {

			setTimeout(() => { this.setState(this.createInitialState()); }, 1000);
		}

		var selected = _.find(this.state.words, w => w.spanish === word);
		selected.isCorrect = isCorrect;

		this.setState({
			words: this.state.words
		});
	}

	render() {

		return <div className='quiz'>
			<h3 className='question'>{this.state.question}</h3>
			{this.state.words.map(function (word) {
				return <div>{word.isCorrect}
					<Word word={word.spanish} isCorrect={word.isCorrect} onWordSelected={this.handleWordSelected}/>
				</div>;
			}, this)}
		</div>;
	}
}

Quiz.propTypes = { data: React.PropTypes.array.isRequired };

module.exports = Quiz;
