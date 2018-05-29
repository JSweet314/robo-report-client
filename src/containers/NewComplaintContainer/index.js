import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import questionBlocks from './complaintQuestions';
import SummaryReport from '../../components/SummaryReport';
import BlockNavBtnGroup from '../../components/BlockNavBtnGroup';
import PropTypes from 'prop-types';
import * as actions from '../../actions';
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
      if (blockIndex === questionBlocks.length) {
        const user_id = this.props.user.id;
        this.props.submitNewComplaint({ ...this.state.values, user_id });
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
    const block = questionBlocks[blockIndex] || {};
    let isNextBtnDisabled = true;
    if (block.questions) {
      isNextBtnDisabled = block.questions.some(question => {
        const { value, required, dependent } = question;
        if (required && dependent) {
          return (!this.state.values[value] || this.state.values[value] === '-')
            && this.state.values[dependent] === 'Yes'; 
        }
        if (required) {
          return !this.state.values[value] || this.state.values[value] === '-';
        }
        return false;
      });
    }

    return (
      <div
        className="question-block"
        key={`questionBlock-${blockIndex + 1}`}
      >
        <h3>{block.headline || 'Summary'}</h3>
        {
          blockIndex === questionBlocks.length ? 
            <SummaryReport 
              questionBlocks={questionBlocks}
              values={this.state.values} 
            />
            :
            this.questionBuilder(block)
        }
        <BlockNavBtnGroup
          isNextBtnDisabled={isNextBtnDisabled}
          handleQuestionBlockNavigation={this.handleQuestionBlockNavigation}
        />
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
    const { values } = this.state;
    const { label, value, options, required, dependent } = question;
    const asterisk = required ? '*' : '';
    let displaySetting = 'flex';
    const optionElems = options.map(option =>
      <option key={`${value}-${option}`} value={option}>{option}</option>
    );
    if (dependent) {
      displaySetting = values[dependent] === 'Yes' ? 'flex' : 'none';
    }
    return (
      <div
        className="complaint-question"
        key={value}
        style={{ display: displaySetting }}
      >
        <label htmlFor={value}>{label}{asterisk}</label>
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
    const { values } = this.state;
    const { label, type, value, required, dependent } = question;
    const asterisk = required ? '*' : '';
    let displaySetting = 'flex';
    if (dependent) {
      displaySetting = values[dependent] === 'Yes' ? 'flex' : 'none';
    }
    return (
      <div
        className="complaint-question"
        key={value}
        style={{ display: displaySetting }}
      >
        <label htmlFor={value}>{label}{asterisk}</label>
        <input
          maxLength='255'
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
    const asterisk = required ? '*' : '';
    return (
      <div className="complaint-question" key={value}>
        <label htmlFor={value}>{label}{asterisk}</label>
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

export const mapDispatchToProps = dispatch => ({
  submitNewComplaint: complaint => dispatch(
    actions.submitNewComplaint(complaint)
  )
});

NewComplaintContainer.propTypes = {
  user: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
  }).isRequired,
  submitNewComplaint: PropTypes.func.isRequired
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewComplaintContainer)
);