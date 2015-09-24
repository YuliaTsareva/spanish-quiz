var _ = require('underscore');
var React = require('react');

var Word = require('./Word');

class Question extends React.Component {

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

    var selected = _.find(this.state.options, w => w.spanish === word);
    selected.isCorrect = isCorrect;

    this.setState({
      options: this.state.options
    });


    if (isCorrect) {
      this.props.onQuestionAnswered();
    }
  }

  render() {

    return <div className='question'>
      <h3>{this.props.question}</h3>
      {this.state.options.map(function (word) {
        return <div>{word.isCorrect}
          <Word word={word.spanish} isCorrect={word.isCorrect} onWordSelected={this.handleWordSelected}/>
        </div>;
      }, this)}
    </div>;
  }
}

Question.propTypes = {
  question: React.PropTypes.string.isRequired,
  options: React.PropTypes.array.isRequired,
  checkAnswer: React.PropTypes.func.isRequired
};

module.exports = Question;
