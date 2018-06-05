import React from 'react';
import PropTypes from 'prop-types';
import Accordion from '../Accordion';
import './style.css';

const SummaryReport = ({ questionBlocks, values }) => {
  const reportItems = questionBlocks
    .map(block => block.questions)
    .reduce((reportItems, questions) => [...reportItems, ...questions], []);

  const summary = reportItems.map(question => {
    const value =
      values[question.value] === '-' || !values[question.value]
        ? 'N/A'
        : values[question.value];
    return (
      <p key={`question-${question.value}`}
        className='summary__item'
      >
        <strong className='summary_question'>{question.label}:</strong> {value}
      </p>
    );
  });

  const { subject, date, callerIdNumber } = values;
  const summaryTitle = 
    `Subject: ${subject}, Date: ${date}, Caller: ${callerIdNumber}`;

  return (
    <Accordion content={summary} headingText={summaryTitle} key={values.id} />
  );
};

SummaryReport.propTypes = {
  values: PropTypes.object.isRequired,
  questionBlocks: PropTypes.array.isRequired
};

export default SummaryReport;
