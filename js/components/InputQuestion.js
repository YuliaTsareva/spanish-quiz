var _ = require('underscore');
var React = require('react');
var classNames = require('classnames');

var Word = require('./Word');

class InputQuestion extends React.Component {

	constructor(props) {
		super(props);

		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleAnswerChanged = this.handleAnswerChanged.bind(this);
		this.handleAnswerReady = this.handleAnswerReady.bind(this);
		this.handleContinue = this.handleContinue.bind(this);

		this.state = {
			answer: ''
		}
	}

	componentWillReceiveProps() {

		this.setState({
				answer: '',
				wrongAnswer: false
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
			this.setState({
				wrongAnswer: true
			});
		}
	}

	handleKeyDown(e) {
		if (e.keyCode == 13) {

			this.handleAnswerReady();
		}
	}

	handleContinue() {

		this.props.onQuestionAnswered();
	}

	render() {

		var button;
		var questionResult;

		if (this.state.wrongAnswer) {
			questionResult = <div className='questionResult'>
								Incorrecto. La respuesta correcta es <span className='answer'>{this.props.answer}</span>.
							</div>;

			button = <input type='button'
			                value='Continuar'
			                className='btn btn-success btn-lg'
			                onClick={this.handleContinue}/>
		} else {
			button = <input type='button'
			                value='Comprobar'
			                className='btn btn-success btn-lg'
			                onClick={this.handleAnswerReady}/>;
		}

		var classes = classNames({
			'question': true,
			'error': this.state.wrongAnswer
		});

		return <div className={classes}>
			<h3>{this.props.question}</h3>
			<input type='text'
			       value={this.state.answer}
			       placeholder='Escriba aquí'
			       onChange={this.handleAnswerChanged}
			       onKeyDown={this.handleKeyDown} />
			{button}
			{questionResult}
		</div>;
	}
}

InputQuestion.propTypes = {
	question: React.PropTypes.string.isRequired,
	checkAnswer: React.PropTypes.func.isRequired
};

module.exports = InputQuestion;
