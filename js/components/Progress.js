import React from 'react';
import { ProgressBar } from 'react-bootstrap';

let Progress = (props) => {
  const percentage = props.done * 100.0 / props.total;
  return <ProgressBar now={percentage}/>;
};

Progress.propTypes = {
  done: React.PropTypes.number.isRequired,
  total: React.PropTypes.number.isRequired
};

export default Progress;
