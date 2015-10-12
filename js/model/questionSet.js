import _ from 'underscore';
import config from '../config';

export default class QuestionSet {

  static create(topicWords) {
    const questionsCount = Math.min(topicWords.length, config.maxQuestionsCount);
    let questions = _.shuffle(topicWords).slice(0, questionsCount);

    questions = QuestionSet.fillQuestionsWithOptions(questions, topicWords);

    return new QuestionSet(questions, topicWords);
  }

  static fillQuestionsWithOptions(questions, topicWords) {

    return questions.map(q => {

      const options = [{answer: q.answer}].concat(QuestionSet.selectWrongOptions(q, topicWords));

      return {
        question: q.question,
        answer: q.answer,
        options: _.shuffle(options)
      };
    });
  }

  static selectWrongOptions(question, topicWords) {
    const wrongOptions = _.map(_.filter(topicWords, function (w) {

      return w.question !== question.question;
    }), function (w) {

      return {answer: w.answer};
    });

    return _.shuffle(wrongOptions).slice(0, config.optionsCount - 1);
  }

  constructor(questions, topicWords) {
    this.questions = questions;
    this.questionsCount = questions.length;

    this.topicWords = topicWords;
  }

  checkAnswer(question, userAnswer) {
    userAnswer = userAnswer.toLowerCase();

    const isSameWord = w => w.question === question && w.answer.toLowerCase() === userAnswer;

    const sameWord = this.topicWords.find(isSameWord);
    return sameWord ? true : false;
  }
}
