import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import questionBlocks from './complaintQuestions';
import PropTypes from 'prop-types';

export class NewComplaintContainer extends Component {
  constructor() {
    super();
    this.state = {
      values: {
        subject: '',
        description: '',
        isSoliciting: '-',
        typeOfSolicit: '',
        doneBusinessWith: '-',
        inquiredWith: '-',
        householdRelation: '-',
        permissionToCall: '-',
        writtenPermission: '-',
        dateOfPermission: '',
        date: '',
        time: '',
        typeOfCall: '',
        receivedCallerId: '-',
        callerIdNumber: '',
        callerIdName: '',
        receivedBusinessName: '-',
        nameAtBeginning: '-',
        providedAdvertiserName: '',
        providedAdvertiserNumber: ''
      },
      blockIndex: 0
    };
  }

  handleOnChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value});
  }

  questionFramer = () => {
    const { blockIndex } = this.state;
    const block = questionBlocks[blockIndex];
    return (
      <div key={`questionBlock-${blockIndex + 1}`}>
        <h3>{block.headline}</h3>
        {this.questionBuilder(block)}
      </div>
    );
  };

  questionBuilder = block => {
    return block.questions.map(question => {
      if (question.type === 'select') {
        return this.selectQuestionBuilder(question);
      }
      return this.textQuestionBuilder(question);

    });
  }

  selectQuestionBuilder = question => {
    const { label, value, options, required } = question;
    const optionElems = options.map(option =>
      <option key={`${value}-${option}`} value={option}>{option}</option>
    );
    return (
      <div key={value}>
        <label htmlFor={value}>{label}</label>
        <select
          onChange={event => this.handleOnChange(event)}
          value={this.state.values[value]}
          name={value}
          id={value}
          required={required}
        >
          {optionElems}
        </select>
      </div>
    );
  }

  textQuestionBuilder = question => {
    const { label, type, value, required } = question;
    return (
      <div key={value}>
        <label htmlFor={value}>{label}</label>
        <input
          onChange={event => this.handleOnChange(event)}
          id={value}
          type={type}
          value={this.state.values[value]}
          required={required}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.questionFramer()}
      </div>
    );
  }
}

NewComplaintContainer.propTypes = {
  user: PropTypes.object
};

export const mapStateToProps = ({ user }) => ({
  user
});

export default withRouter(
  connect(mapStateToProps, null)(NewComplaintContainer)
);