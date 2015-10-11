var _ = require('underscore');
var React = require('react');

var Word = require('./Word');

class SelectQuestion extends React.Component {

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
      }
    );
  }

  handleWordSelected(word) {

    var isCorrect = this.props.checkAnswer(this.props.question, word);

    var selected = _.find(this.state.options, w => w.answer === word);
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
      <div className='question'>
        <div className="col-xs-12 col-sm-6">
          <h3>{this.props.question}</h3>
        </div>
        <div className="col-xs-12 col-sm-6">
          {this.state.options.map(function (word) {
            return (
              <Word key={word.answer + this.props.question} word={word.answer} isCorrect={word.isCorrect}
                    onWordSelected={this.handleWordSelected}/>
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
  checkAnswer: React.PropTypes.func.isRequired
};

module.exports = SelectQuestion;
