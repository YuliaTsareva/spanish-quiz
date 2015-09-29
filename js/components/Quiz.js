var _ = require('underscore');
var React = require('react');

var bootstrap = require('react-bootstrap');
var Modal = bootstrap.Modal;
var Button = bootstrap.Button;

var config = require('./../config');

var Progress = require('./Progress');
var Question = require('./Question');
var InputQuestion = require('./InputQuestion');

class Quiz extends React.Component {

  constructor(props) {
    super(props);

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
      checkAnswer: state.checkAnswer.bind(state),
      showModal: false
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
                                checkAnswer={this.state.checkAnswer}
                                onQuestionAnswered={this.handleQuestionAnswered}/>;
    } else {
      question = <Question question={this.state.currentQuestion.question}
                           options={this.state.currentQuestion.options}
                           checkAnswer={this.state.checkAnswer}
                           onQuestionAnswered={this.handleQuestionAnswered}/>
    }

    return (
      <div className='quiz'>
        <Progress current={this.state.questionsDone} total={this.state.questionsCount}/>

        <div className='question-area'>
          {question}
        </div>

        <div className='footer'>
          <Button className="check-button" bsSize='large' bsStyle='success'>Comprobar</Button>
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
