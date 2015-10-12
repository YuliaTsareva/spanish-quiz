import { getUrlHash } from './utils';
import { find as findTopic, getRandom as getRandomTopic, loadWords} from './topics';
import QuestionSet from './model/QuestionSet';

import React from 'react';
import ReactDOM from 'react-dom';
import Quiz from './components/Quiz';

let topic = findTopic(getUrlHash());

if (!topic) {
  topic = getRandomTopic();
  window.location.hash = topic.name;
}

loadWords(topic, function (topicWords) {

  const data = {
    selectGame: function() {
      return QuestionSet.create(topicWords);
    }
  };

  ReactDOM.render(
    <Quiz data={data}/>,
    document.getElementById('app')
  );
});
