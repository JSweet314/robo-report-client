import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import questionBlocks from './complaintQuestions';
import PropTypes from 'prop-types';
import './style.css';

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
    const values = { ...this.state.values, [id]: value };
    this.setState({ values });
  }

  handleQuestionBlockNavigation = event => {
    const { name } = event.target;
    const { blockIndex } = this.state;
    switch (name) {
    case 'back':
      if (blockIndex === 0) {
        this.props.history.goBack();
      } else {
        this.setState({ blockIndex: blockIndex - 1 });
      }
      break;
    case 'next':
      if (blockIndex === questionBlocks.length - 1) {
        this.props.history.push('/');
      } else {
        this.setState({ blockIndex: blockIndex + 1 });
      }
      break;
    default:
      break;
    }
  }

  questionFramer = () => {
    const { blockIndex } = this.state;
    const block = questionBlocks[blockIndex];
    return (
      <div
        className="question-block"
        key={`questionBlock-${blockIndex + 1}`}
      >
        <h3>{block.headline}</h3>
        {this.questionBuilder(block)}
        <div className='question-block-nav-group'>
          <button
            className='question-block-nav-btn back-btn'
            name='back'
            onClick={event => this.handleQuestionBlockNavigation(event)}
          >
            Back
          </button>
          <button
            className='question-block-nav-btn next-btn'
            name='next'
            onClick={event => this.handleQuestionBlockNavigation(event)}
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  questionBuilder = block =>
    block.questions.map(question => {
      switch (question.type) {
      case 'select':
        return this.selectQuestionBuilder(question);
      case 'textarea':
        return this.textareaQuestionBuilder(question);
      default:
        return this.textQuestionBuilder(question);
      }
    });

  selectQuestionBuilder = question => {
    const { label, value, options, required } = question;
    const optionElems = options.map(option =>
      <option key={`${value}-${option}`} value={option}>{option}</option>
    );
    return (
      <div className="complaint-question" key={value}>
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
      <div className="complaint-question" key={value}>
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

  textareaQuestionBuilder = question => {
    const { label, value, required } = question;
    return (
      <div className="complaint-question" key={value}>
        <label htmlFor={value}>{label}</label>
        <textarea
          onChange={event => this.handleOnChange(event)}
          id={value}
          value={this.state.values[value]}
          required={required}
        />
      </div>
    );
  }

  render() {
    const questionBlock = this.questionFramer();
    return (
      <div>
        {questionBlock}
      </div>
    );
  }
}

export const mapStateToProps = ({ user }) => ({
  user
});

NewComplaintContainer.propTypes = {
  user: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(
  connect(mapStateToProps, null)(NewComplaintContainer)
);