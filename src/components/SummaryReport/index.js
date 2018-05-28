import React from 'react';
import PropTypes from 'prop-types';

const SummaryReport = ({ 
  questionBlocks, 
  values
}) => {
  const reportItems = questionBlocks.map(block => block.questions)
    .reduce((reportItems, questions) => [...reportItems, ...questions], []);

  const summary = reportItems.map(question => {
    const value = values[question.value] === '-' || !values[question.value] ?
      'N/A' : values[question.value];
    return (
      <p key={question.value}>
        <strong>{question.label}</strong>: {value}
      </p>
    );
  });

  return (
    <div>
      { summary }
    </div>
  );
};

SummaryReport.propTypes = {
  values: PropTypes.object.isRequired,
  questionBlocks: PropTypes.array.isRequired
};

export default SummaryReport;