import readCsv from './csv';
import { getRandomInt } from './utils';

export const topics = [
  {
    name: 'weather',
    spanishTitle: 'Tiempo',
    imageUrl: 'images/topics/weather.jpg'
  },
  {
    name: 'geography',
    spanishTitle: 'Geografía',
    imageUrl: 'images/topics/geography.jpg'
  },
  {
    name: 'politics',
    spanishTitle: 'Política',
    imageUrl: 'images/topics/politics.jpg'
  },
  {
    name: 'street',
    spanishTitle: 'Calle',
    imageUrl: 'images/topics/street.jpg'
  }
];

export function loadWords(topic, next) {
  readCsv('data/' + topic + '.txt', function (err, data) {

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
