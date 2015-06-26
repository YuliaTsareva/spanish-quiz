var React = require('react');

class Progress extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var percentage = (this.props.current * 100.0 / this.props.total) + '%';
		return <div className="progress">
			<div className="progress-bar progress-bar-success" role="progressbar" style={{width: percentage}}>
				<span>{this.props.current}/{this.props.total}</span>
			</div>
		</div>;
	}
}

Progress.propTypes = {
	current: React.PropTypes.number.isRequired,
	total: React.PropTypes.number.isRequired
};

module.exports = Progress;
