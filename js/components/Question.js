//var _ = require('underscore');
//var React = require('react');
//
//var Word = require('./Word');
//
//class Question extends React.Component {
//
//	constructor(props) {
//		super(props);
//
//		//this.handleWordSelected = this.handleWordSelected.bind(this);
//		//this.getInitialState = this.getInitialState.bind(this);
//		//
//		//this.state = this.getInitialState();
//	}
//
//	handleWordSelected(word) {
//
//	//	var isCorrect = this.state.checkAnswer(this.state.currentQuestion.question, word);
//	//
//	//	var selected = _.find(this.state.currentQuestion.options, w => w.spanish === word);
//	//	selected.isCorrect = isCorrect;
//	//
//	//	this.setState({
//	//		questions: this.state.questions
//	//	});
//	//
//	//	if (isCorrect) {
//	//
//	//		setTimeout(() => {
//	//
//	//			var questionDone = this.state.questionsDone + 1;
//	//
//	//			var newState;
//	//
//	//			if (questionDone === this.state.questionsCount) {
//	//
//	//				this.setState({
//	//					questionsDone: questionDone
//	//				});
//	//
//	//				alert('You are AWESOME!');
//	//				newState = this.getInitialState();
//	//			} else {
//	//
//	//				newState = this.state;
//	//				newState.questionsDone = questionDone;
//	//				newState.currentQuestion = newState.questions[questionDone];
//	//			}
//	//
//	//			this.setState(newState);
//	//		}, 1000);
//	//	}
//	//}
//	//
//	//getInitialState() {
//	//
//	//	var state = this.props.data.selectGame();
//	//
//	//	return _.extend(state, {
//	//		questionsDone: 0,
//	//		currentQuestion: state.questions[0]
//	//	});
//	}
//
//	render() {
//
//		return <div className='question'>
//			<h3>{this.props.question}</h3>
//			{this.props.options.map(function (word) {
//				return <div>{word.isCorrect}
//					<Word word={word.spanish} isCorrect={word.isCorrect} onWordSelected={this.handleWordSelected}/>
//				</div>;
//			}, this)}
//		</div>;
//	}
//}
//
//Question.propTypes = {
//	question: React.PropTypes.string.isRequired,
//	options: React.PropTypes.array.isRequired
//};
//
//module.exports = Question;
