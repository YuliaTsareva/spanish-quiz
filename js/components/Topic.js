import React from 'react';

import { loadWords} from './../topics';
import QuestionSet from './../model/QuestionSet';
import Quiz from './Quiz';

export default class Topic extends React.Component {
  constructor(props) {
    super(props);

    loadWords(props.params.topic, (topicWords) => {
      const data = {
        selectGame: function () {
          return QuestionSet.create(topicWords);
        }
      };

      this.setState({ data: data });
    });
  }

  render() {
    if (!this.state || !this.state.data) {
      return (
        <div></div>
      );
    }

    return <Quiz data={this.state.data} />;
  }
}
