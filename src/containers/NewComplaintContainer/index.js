import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import questionBlocks from './complaintQuestions';
import ComplaintSubmitPrompt from '../../components/ComplaintSubmitPrompt';
import BlockNavBtnGroup from '../../components/BlockNavBtnGroup';
import ProgressMeter from '../../components/ProgressMeter';
import PropTypes from 'prop-types';
import * as actions from '../../actions';
import moment from 'moment';
import './style.css';

let electron;
if (typeof window.require !== 'function') {
  electron = require('electron');
} else {
  electron = window.require('electron');
}
const ipcRenderer = electron.ipcRenderer;

export class NewComplaintContainer extends Component {
  constructor() {
    super();
    this.state = {
      values: {
        addtlInfo: '',
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
        providedAdvertiserNumber: '',
        isSubmitted: '-'
      },
      blockIndex: 0
    };
  }

  handleOnChange = event => {
    const { id, value } = event.target;
    if (id === 'isSubmitted') {
      const boolean = value === 'true' ? true : false;
      const values = { ...this.state.values, [id]: boolean };
      this.setState({ values });
    } else {
      const values = { ...this.state.values, [id]: value };
      this.setState({ values });
    }
  }

  handleQuestionBlockNavigation = event => {
    const { name } = event.target;
    const { user } = this.props;
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
        const args = this.mapReportFormToCmdArgs(
          { ...user, ...this.state.values }
        );
        ipcRenderer.send('startNightmare', args);
        this.setState({ blockIndex: blockIndex + 1 });
      } else if (blockIndex === questionBlocks.length + 1) {
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

  formatPhoneNumber = number => {
    var cleaned = ("" + number).replace(/\D/g, '');
    var valid = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!valid) ? '' :  valid[1] + "-" + valid[2] + "-" + valid[3];
  }

  mapReportFormToCmdArgs = report => {
    return Object.keys(report).reduce((args, key) => {
      if (key === 'date') {
        const formatedDate = moment(report[key]).format('MMMM D, YYYY');
        return [...args, `--answers.${key}="${formatedDate}"`];
      }
      if (key === 'time') {
        const formatedTime = moment(report[key], 'HH:mm').format('h:mm a');
        return [...args, `--answers.${key}="${formatedTime}"`];
      }
      if (key === 'phone' || key === 'callerIdNumber') {
        const formatedNumber = this.formatPhoneNumber(report[key]);
        return [...args, `--answers.${key}="${formatedNumber}"`];
      }
      return [...args, `--answers.${key}="${report[key]}"`];
    }, []);
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
        <h3 className='question-block__headline'>
          {block.headline || 'Now, for the moment of truth...'}
        </h3>
        {
          blockIndex >= questionBlocks.length ?
            <ComplaintSubmitPrompt />
            :
            this.questionBuilder(block)
        }
        <BlockNavBtnGroup
          blockIndex={blockIndex}
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
    const optional = required ? '' : 'optional';
    let displaySetting = 'complaint-question';
    if (dependent) {
      displaySetting = values[dependent] === 'Yes' 
        ? 'complaint-question' 
        : 'complaint-question hidden';
    }
    const optionElems = options.map(option =>
      <option key={`${value}-${option}`} value={option}>{option}</option>
    );
    return (
      <div
        className={displaySetting}
        key={value}
      >
        <label htmlFor={value}>{label}</label>
        <select
          onChange={event => this.handleOnChange(event)}
          value={this.state.values[value]}
          name={value}
          id={value}
          required={required}
          placeholder={optional}
        >
          {optionElems}
        </select>
      </div>
    );
  }

  textQuestionBuilder = question => {
    const { values } = this.state;
    const { label, type, value, required, dependent } = question;
    const optional = required ? '' : 'optional';
    let displaySetting = 'complaint-question';
    if (dependent) {
      displaySetting = values[dependent] === 'Yes' 
        ? 'complaint-question' 
        : 'complaint-question hidden';
    }
    return (
      <div
        className={displaySetting}
        key={value}
        style={{ display: displaySetting }}
      >
        <label htmlFor={value}>{label}</label>
        <input
          maxLength='255'
          onChange={event => this.handleOnChange(event)}
          id={value}
          type={type}
          value={this.state.values[value]}
          required={required}
          placeholder={optional}
        />
      </div>
    );
  }

  textareaQuestionBuilder = question => {
    const { label, value, required } = question;
    const optional = required ? '' : 'optional';
    return (
      <div className="complaint-question" key={value}>
        <label htmlFor={value}>{label}</label>
        <textarea
          onChange={event => this.handleOnChange(event)}
          id={value}
          value={this.state.values[value]}
          required={required}
          placeholder={optional}
        />
      </div>
    );
  }

  render() {
    const { blockIndex } = this.state;
    const questionBlock = this.questionFramer();
    return (
      <div className='new-complaint-container'>
        <ProgressMeter blockIndex={blockIndex} min={-1} max={5} />
        {
          blockIndex <= questionBlocks.length ? questionBlock : (
            <div
              className="question-block"
              key={`questionBlock-${blockIndex + 1}`}
            >
              <h3 className='question-block__headline'>
                How did it go?
              </h3>
              <div className="complaint-question">
                <label htmlFor='isSubmitted'>Did you submit the form?</label>
                <select
                  onChange={event => this.handleOnChange(event)}
                  value={this.state.values['isSubmitted']}
                  name='isSubmitted'
                  id='isSubmitted'
                  required={true}
                >
                  <option value='-'>-</option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
              <BlockNavBtnGroup
                blockIndex={blockIndex}
                isNextBtnDisabled={this.state.values.isSubmitted === '-'}
                handleQuestionBlockNavigation={
                  this.handleQuestionBlockNavigation
                }
              />
            </div>
          )
        }
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