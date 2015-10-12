import readCsv from './csv';
import { getRandomInt } from './utils';

const topics = [
  {
    name: 'weather',
    spanishTitle: 'Tiempo'
  },
  {
    name: 'geography',
    spanishTitle: 'Geografía'
  },
  {
    name: 'politics',
    spanishTitle: 'Política'
  },
  {
    name: 'street',
    spanishTitle: 'Calle'
  }
];

export function getRandom() {
  const randomTopicIndex = getRandomInt(topics.length);
  return topics[randomTopicIndex];
}

export function find(name) {
  return topics.find(t => t.name === name);
}

export function loadWords(topic, next) {
  readCsv('data/' + topic.name + '.txt', function (err, data) {

    if (err) {
      console.log(err);
      return;
    }

    data = data.filter(item => item.spanish && item.russian);

    data = data.map(word => ({
        question: word.russian,
        answer: word.spanish
      }));

    next(data);
  });
}
