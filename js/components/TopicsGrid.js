import React from 'react';
import TopicGridItem from './TopicGridItem';

import { topics } from './../topics';

const TopicsGrid = () => {
  return (<div className='topics'>
    <div className='row'>
      { topics.map(t => (<TopicGridItem key={ t.name } name={ t.name } title={ t.spanishTitle } img={ t.imageUrl } />)) }
    </div>
  </div>);
};

export default TopicsGrid;
