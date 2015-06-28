var _ = require('underscore');
var React = require('react');

var Word = require('./Word');

class InputQuestion extends React.Component {

	constructor(props) {
		super(props);

		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleAnswerChanged = this.handleAnswerChanged.bind(this);

		this.state = {
			answer: ''
		}
	}

	componentWillReceiveProps() {

		this.setState({
				answer: ''
			}
		);
	}

	handleAnswerChanged(e) {
		this.setState({
			answer: e.target.value
		});
		console.log("answer: " + this.state.answer);
	}

	handleAnswerReady() {

		var isCorrect = this.props.checkAnswer(this.props.question, this.state.answer.trim().toLowerCase());

		if (isCorrect) {
			this.props.onQuestionAnswered();
		} else {
			alert('Incorrecto.');
		}
	}

	handleKeyDown(e) {
		if (e.keyCode == 13) {

			this.handleAnswerReady();
		}
	}

	render() {

		return <div className='question'>
			<h3>{this.props.question}</h3>
			<input type='text'
			       value={this.state.answer}
			       placeholder='Escriba aquí'
			       onChange={this.handleAnswerChanged}
			       onKeyDown={this.handleKeyDown} />
		</div>;
		//<input type='button'
		//       value='Comprobar'
		//       className='btn btn-success' />
	}
}

//todo require checkAnswer?
InputQuestion.propTypes = {
	question: React.PropTypes.string.isRequired
};

module.exports = InputQuestion;
