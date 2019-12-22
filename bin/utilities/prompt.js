'use strict';

function isAnswerAffirmative(answer) { return /^y.*/i.test(answer); }

module.exports = {
  isAnswerAffirmative
};
