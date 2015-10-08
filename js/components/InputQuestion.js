var _ = require('underscore');
var React = require('react');
var classNames = require('classnames');

var Button = require('react-bootstrap').Button;

var Word = require('./Word');

class InputQuestion extends React.Component {

  constructor(props) {
    super(props);

    this.handleKeyUp = this.handleKeyUp.bind(this);
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
  }

  handleAnswerReady() {

    var isCorrect = this.props.checkAnswer(this.props.question, this.state.answer.trim());

    if (isCorrect) {
      this.props.onQuestionAnswered();
    } else {
      this.setState({
        wrongAnswer: true
      });
    }
  }

  handleKeyUp(e) {

    this.props.onAnswerChanged(this.state.answer);

    if (e.keyCode == 13) {

      this.handleAnswerReady();
    }
  }

  handleContinue() {

    this.props.onQuestionAnswered();
  }

  render() {

    var questionResult;

    var buttonHandler;
    var buttonText;

    if (this.state.wrongAnswer) {
      questionResult = <div className='question-result'>
        Incorrecto. La respuesta correcta es <span className='answer'>{this.props.answer}</span>.
      </div>;

      buttonHandler = this.handleContinue;
    } else {
      buttonHandler = this.handleAnswerReady;
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
             onKeyUp={this.handleKeyUp}/>
      {questionResult}
    </div>;
  }
}
//<Button bsSize='large' bsStyle='success' onClick={buttonHandler}>{buttonText}</Button>

InputQuestion.propTypes = {
  question: React.PropTypes.string.isRequired,
  onAnswerChanged: React.PropTypes.func.isRequired
};

module.exports = InputQuestion;
