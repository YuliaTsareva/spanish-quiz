import React from 'react';
import { Button } from 'react-bootstrap';

export default class Option extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onOptionSelected(this.props.word);
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
    return (
      <Button className='option-button' bsSize='large' bsStyle={this.getButtonClass()} block
              onClick={this.handleClick}>{this.props.word}
      </Button>
    );
  }
}

Option.propTypes = {
  word: React.PropTypes.string.isRequired,
  onOptionSelected: React.PropTypes.func.isRequired
};
