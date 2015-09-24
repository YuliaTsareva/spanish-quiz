var React = require('react');

var ProgressBar = require('react-bootstrap').ProgressBar;

class Progress extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var percentage = this.props.current * 100.0 / this.props.total;
    return <ProgressBar bsStyle="success" now={percentage} />;
  }
}

Progress.propTypes = {
  current: React.PropTypes.number.isRequired,
  total: React.PropTypes.number.isRequired
};

module.exports = Progress;
