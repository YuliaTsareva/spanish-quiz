var _ = require('underscore');
var React = require('react');
var classNames = require('classnames');

var bootstrap = require('react-bootstrap');
var Modal = bootstrap.Modal;
var Button = bootstrap.Button;

var config = require('./../config');

var Progress = require('./Progress');
var SelectQuestion = require('./SelectQuestion');
var InputQuestion = require('./InputQuestion');

class Quiz extends React.Component {

  constructor(props) {
    super(props);

    this.handleAnswerChanged = this.handleAnswerChanged.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.handleQuestionAnswered = this.handleQuestionAnswered.bind(this);
    this.createInitialState = this.createInitialState.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.state = this.createInitialState();
  }

  createInitialState() {

    var state = this.props.data.selectGame();

    return _.extend(state, {
      questionsDone: 0,
      currentQuestion: state.questions[0],
      isRightAnswer: state.isRightAnswer.bind(state),
      showModal: false
    });
  }

  handleAnswerChanged(answer) {

    console.log('handleAnswerChanged ' + answer);

    this.setState({
      answer: answer
    });
    //var isCorrect = this.props.checkAnswer(this.props.question, this.state.answer.trim());
    //
    //if (isCorrect) {
    //  this.props.onQuestionAnswered();
    //} else {
    //  this.setState({
    //    wrongAnswer: true
    //  });
    //}
  }

  checkAnswer() {

    var isCorrect = this.state.isRightAnswer(this.state.currentQuestion.question, this.state.answer.trim());

    console.log('checkAnswer ' + this.state.answer + ' ' + isCorrect);

    //if (isCorrect) {
    //  this.props.onQuestionAnswered();
    //} else {
    //  this.setState({
    //    wrongAnswer: true
    //  });
    //}

    var done = this.state.questionsDone + 1;
    this.setState({
      questionsDone: done,
      rightAnswer: isCorrect,
      questionAnswered: true
    });
  }

  nextQuestion() {
    var newState = this.state;
    newState.currentQuestion = newState.questions[this.state.questionsDone];
    delete newState.rightAnswer;
    delete newState.questionAnswered;

    this.setState(newState);
  }

  handleQuestionAnswered() {

    setTimeout(() => {

      var questionDone = this.state.questionsDone + 1;

      var newState;

      if (questionDone === this.state.questionsCount) {

        this.setState({
          questionsDone: questionDone
        });

        newState = {
          showModal: true
        };
      } else {

        newState = this.state;
        newState.questionsDone = questionDone;
        newState.currentQuestion = newState.questions[questionDone];
      }

      this.setState(newState);
    }, 1000);
  }

  closeModal() {
    var newState = this.createInitialState();
    this.setState(newState);
  }

  render() {

    var question;

    var randomBool = Math.random() < config.inputQuestionProbability;

    if (randomBool) {
      question = <InputQuestion question={this.state.currentQuestion.question}
                                answer={this.state.currentQuestion.answer}
                                onAnswerChanged={this.handleAnswerChanged} />;
    } else {
      question = <SelectQuestion question={this.state.currentQuestion.question}
                                 options={this.state.currentQuestion.options}
                                 onAnswerChanged={this.handleAnswerChanged} />;
    }

    var quizClasses = classNames({
      quiz: true
    });

    var button;

    if (this.state.questionAnswered) {
      quizClasses = classNames({
        quiz: true,
        "right-answer": this.state.rightAnswer === true,
        error: this.state.rightAnswer === false
      });

      button = <Button className="quiz-button" onClick={this.nextQuestion}>Continuar</Button>;
    } else {
      button = <Button className="quiz-button" onClick={this.checkAnswer}>Comprobar</Button>;
    }

    console.log(quizClasses);

    return (
      <div className={quizClasses}>
        <Progress current={this.state.questionsDone} total={this.state.questionsCount}/>

        <div className='question-area'>
          {question}
        </div>

        <div className="footer">
          {button}
        </div>

        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>¡Estupendo!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img className='motivation-image' src={config.motivationImage} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>Otra vez</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

Quiz.propTypes = {data: React.PropTypes.object.isRequired};

module.exports = Quiz;
