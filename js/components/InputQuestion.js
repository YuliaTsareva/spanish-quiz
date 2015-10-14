import React from 'react';
import classNames from 'classnames';

import { Button } from 'react-bootstrap';

export default class InputQuestion extends React.Component {

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
        rightAnswer: false,
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
    const isCorrect = this.props.checkAnswer(this.props.question, this.state.answer.trim());

    if (isCorrect) {
      this.setState({
        rightAnswer: true
      });
      this.props.onQuestionAnswered();
    } else {
      this.setState({
        wrongAnswer: true
      });
    }
  }

  handleKeyDown(e) {
    if (e.keyCode == 13) {

      if (this.state.wrongAnswer) {
        this.handleContinue();
      } else {
        this.handleAnswerReady();
      }
    }
  }

  handleContinue() {
    this.props.onQuestionAnswered();
  }

  render() {
    let questionResult;

    if (this.state.wrongAnswer) {
      questionResult = <div className='question-result'>
        Incorrecto. La respuesta correcta es <span className='answer'>{this.props.answer}</span>.
      </div>;
    }

    const classes = classNames({
      'question': true,
      'error': this.state.wrongAnswer,
      'ok': this.state.rightAnswer
    });

    return <div className={classes}>
      <h3>{this.props.question}</h3>
      <input type='text'
             value={this.state.answer}
             placeholder='Escriba aquí'
             autoFocus
             onChange={this.handleAnswerChanged}
             onKeyDown={this.handleKeyDown}/>
      <br />
      {questionResult}
    </div>;
  }
}

InputQuestion.propTypes = {
  question: React.PropTypes.string.isRequired,
  checkAnswer: React.PropTypes.func.isRequired,
  onQuestionAnswered: React.PropTypes.func.isRequired
};
