var _ = require('underscore');
var React = require('react');

var Progress = require('./Progress');
var Question = require('./Question');

var InputQuestion = require('./InputQuestion');

class Quiz extends React.Component {

  constructor(props) {
    super(props);

    this.handleQuestionAnswered = this.handleQuestionAnswered.bind(this);
    this.getInitialState = this.getInitialState.bind(this);

    this.state = this.getInitialState();
  }

  getInitialState() {

    var state = this.props.data.selectGame();

    return _.extend(state, {
      questionsDone: 0,
      currentQuestion: state.questions[0]
    });
  }

  handleQuestionAnswered() {

    setTimeout(() => {

      var questionDone = this.state.questionsDone + 1;

      var newState;

      if (questionDone === this.state.questionsCount) {

        this.setState({
          questionsDone: questionDone
        });

        alert('You are AWESOME!');
        newState = this.getInitialState();
      } else {

        newState = this.state;
        newState.questionsDone = questionDone;
        newState.currentQuestion = newState.questions[questionDone];
      }

      this.setState(newState);
    }, 1000);
  }

  render() {

    var question;

    var randomBool = Math.random() < 0.6;

    if (randomBool) {

      question = <Question question={this.state.currentQuestion.question}
                           options={this.state.currentQuestion.options}
                           checkAnswer={this.state.checkAnswer}
                           onQuestionAnswered={this.handleQuestionAnswered}/>
    } else {
      question = <InputQuestion question={this.state.currentQuestion.question}
                                answer={this.state.currentQuestion.answer}
                                checkAnswer={this.state.checkAnswer}
                                onQuestionAnswered={this.handleQuestionAnswered}/>;
    }

    return <div className='quiz'>
      <Progress current={this.state.questionsDone} total={this.state.questionsCount}/>
      {question}
    </div>;
  }
}

Quiz.propTypes = {data: React.PropTypes.array.isRequired};

module.exports = Quiz;
