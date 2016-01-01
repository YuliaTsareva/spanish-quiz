import readCsv from './csv';

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
  },
  {
    name: 'clothes',
    spanishTitle: 'Ropa',
    imageUrl: 'images/topics/clothes.jpg'
  }
];

export function loadWords(topic, next) {
  readCsv('data/' + topic + '.txt', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    var a;
    data = data.filter(item => item.spanish && item.russian);

    data = data.map(word => ({
      question: word.russian,
      answer: word.spanish
    }));

    next(data);
  });
}
