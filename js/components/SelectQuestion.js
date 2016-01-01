import React from 'react';
import Option from './Option';

export default class SelectQuestion extends React.Component {

  constructor(props) {
    super(props);

    this.handleWordSelected = this.handleWordSelected.bind(this);

    this.state = {
      options: this.props.options
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      options: nextProps.options
    });
  }

  handleWordSelected(word) {
    const isCorrect = this.props.checkAnswer(this.props.question, word);

    const selected = this.state.options.find(w => w.answer === word);
    selected.isCorrect = isCorrect;

    this.setState({
      options: this.state.options
    });

    if (isCorrect) {
      this.props.onQuestionAnswered();
    }
  }

  render() {
    return (
      <div className="question">
        <div className="col-xs-12 col-sm-6">
          <h3>{this.props.question}</h3>
        </div>
        <div className="col-xs-12 col-sm-6">
          {this.state.options.map(word => {
            return (
              <Option key={word.answer + this.props.question}
                      word={word.answer}
                      isCorrect={word.isCorrect}
                      onOptionSelected={this.handleWordSelected}
              />
            );
          }, this)}
        </div>
      </div>
    );
  }
}

SelectQuestion.propTypes = {
  question: React.PropTypes.string.isRequired,
  options: React.PropTypes.array.isRequired,
  checkAnswer: React.PropTypes.func.isRequired,
  onQuestionAnswered: React.PropTypes.func.isRequired
};
