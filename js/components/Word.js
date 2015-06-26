var React = require('react');

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
			return 'btn-success';
		}
		if (this.props.isCorrect === false) {
			return 'btn-danger';
		}
		return '';
	}

	render() {
		return <input type='button'
		              className={'btn btn-default btn-lg btn-block ' + this.getButtonClass()}
		              value={this.props.word}
		              onClick={this.handleClick}/>;
	}
}

Word.propTypes = {
	word: React.PropTypes.string.isRequired,
	onWordSelected: React.PropTypes.func.isRequired
};

module.exports = Word;
