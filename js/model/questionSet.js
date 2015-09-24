var _ = require('underscore');

var config = require('../config');

class QuestionSet {

  static create(topicWords) {
    var questionsCount = Math.min(topicWords.length, config.maxQuestionsCount);
    var questions = _.shuffle(topicWords).slice(0, questionsCount);

    questions = QuestionSet.fillQuestionsWithOptions(questions, topicWords);

    return new QuestionSet(questions, topicWords);
  }

  static fillQuestionsWithOptions(questions, topicWords) {

    return _.map(questions, function (q) {

      var options = [{answer: q.answer}].concat(QuestionSet.selectWrongOptions(q, topicWords));

      return {

        question: q.question,
        answer: q.answer,
        options: _.shuffle(options)
      };
    });
  }

  static selectWrongOptions(question, topicWords) {
    var wrongOptions = _.map(_.filter(topicWords, function (w) {

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

    console.log('constructor', this.topicWords);
  }

  checkAnswer(question, userAnswer) {

    var sameWord = _.find(this.topicWords, function (w) {
      return w.question === question && w.answer === userAnswer;
    });
    return sameWord ? true : false;
  }
}

module.exports.QuestionSet = QuestionSet;
