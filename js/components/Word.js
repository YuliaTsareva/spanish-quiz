var React = require('react');

var Button = require('react-bootstrap').Button;

class Word extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onWordSelected(this.props.word);
  }

  getButtonClass() {
    if (this.props.isCorrect) {
      return 'success';
    }
    if (this.props.isCorrect === false) {
      return 'danger';
    }
    return 'default';
  }

  render() {
    return <Button bsSize="large" bsStyle={this.getButtonClass()} block
                   onClick={this.handleClick}>{this.props.word}
           </Button>;
  }
}

Word.propTypes = {
  word: React.PropTypes.string.isRequired,
  onWordSelected: React.PropTypes.func.isRequired
};

module.exports = Word;
