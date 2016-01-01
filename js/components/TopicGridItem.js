import React from 'react';

const TopicGridItem = (props) => {
  return (<div className="topic col-sm-3 col-xs-6">
    <a href={ '#/topic/' + props.name }>
      <img src={ props.img } />
      <div className="topic-label">{ props.title }</div>
    </a>
  </div>);
};

TopicGridItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  img: React.PropTypes.string.isRequired
};

export default TopicGridItem;
