/* eslint-disable max-len */

const questionBlocks = [
  {
    headline: 'Tell us about the call.',
    questions: [
      {
        label: 'Subject',
        type: 'text',
        value: 'subject',
        required: true
      },
      {
        label: 'Description',
        type: 'textarea',
        value: 'description',
        required: true
      },
      {
        label: 'Did the call/message that you are reporting advertise any type of property, goods, or services ?',
        type: 'select',
        value: 'isSoliciting',
        options: ['-', 'Yes', 'No'],
        required: true
      },
      {
        label: 'Type of Property, Goods, or Services',
        type: 'text',
        value: 'typeOfSolicit',
        required: true
      }
    ]
  },
  {
    headline: 'Any inkling of a relationship?',
    questions: [
      {
        label: 'Have you or anyone else in your household done any business with the caller / company within the past 18 months immediately before you received the call / message ?',
        type: 'select',
        value: 'doneBusinessWith',
        options: ['-', 'Yes', 'No', 'Uncertain'],
        required: true
      },
      {
        label: 'Have you or anyone else in your household made any inquiry or application to the caller/company within the 3 months immediately before you received the call/message?',
        type: 'select',
        value: 'inquiredWith',
        options: ['-', 'Yes', 'No', 'Uncertain'],
        required: true
      },
      {
        label: 'Do you or anyone in your household have a personal relationship with the individual that made the call?',
        type: 'select',
        value: 'householdRelation',
        options: ['-', 'Yes', 'No', 'Uncertain'],
        required: true
      },
      {
        label: 'Have you or anyone else in your household or business given the caller/company permission to call?',
        type: 'select',
        value: 'permissionToCall',
        options: ['-', 'Yes', 'No', 'Uncertain'],
        required: true
      },
      {
        label: 'Did you give permission to the caller/business to call you in writing?',
        type: 'select',
        value: 'writtenPermission',
        options: ['-', 'Yes', 'No'],
        required: false
      },
      {
        label: 'Date you provided permission to the caller/company to call',
        type: 'date',
        value: 'dateOfPermission',
        required: false
      }
    ]
  },
  {
    headline: 'The nitty gritty',
    questions: [
      {
        label: 'Date of Your Issue/Problem',
        type: 'date',
        value: 'date',
        required: true
      },
      {
        label: 'Time of Your Issue/Problem',
        type: 'time',
        value: 'time',
        required: true
      },
      {
        label: 'Type of Call or Message',
        type: 'select',
        value: 'typeOfCall',
        options: ['-', 'Abandoned Calls', 'Live Voice', 'Prerecorded Voice', 'Text Message'],
        required: true
      },
      {
        label: 'Did you receive Caller ID Information?',
        type: 'select',
        value: 'receivedCallerId',
        options: ['-', 'Yes', 'No', 'Don\'t have caller id', 'Uncertain'],
        required: true
      },
      {
        label: 'Caller ID Number',
        type: 'tel',
        value: 'callerIdNumber',
        required: false
      },
      {
        label: 'Caller ID Name',
        type: 'text',
        value: 'callerIdName',
        required: false
      }
    ]
  },
  {
    headline: 'Conversational pleasantries',
    questions: [
      {
        label: 'Was the caller\'s business name provided during the call/message?',
        type: 'select',
        value: 'receivedBusinessName',
        options: ['-', 'Yes', 'No', 'Uncertain'],
        required: true
      },
      {
        label: 'Was the business name provided at the beginning of the call/message?',
        type: 'select',
        value: 'nameAtBeginning',
        options: ['-', 'Yes', 'No'],
        required: true
      },
      {
        label: 'Please provide the name of the advertiser provided during the call',
        type: 'text',
        value: 'providedAdvertiserName',
        required: true
      },
      {
        label: 'Provide the advertiser\'s phone number given during the call.',
        type: 'tel',
        value: 'providedAdvertiserNumber',
        required: false
      }
    ]
  }
];

export default questionBlocks;

/*
Have you or anyone else in your household done any business with the 
caller/company within the past 18 months immediately before you received 
the call/message?
<select>
  Yes
  No
  Uncertain
Have you or anyone else in your household made any inquiry or application to the caller/company within the 3 months immediately before you received the call/message?
<select>
  Yes
  No
  Uncertain
Do you or anyone in your household have a personal relationship with the 
individual that made the call?
<select>
  Yes
  No
  Uncertain
Have you or anyone else in your household or business given the caller/company permission to call?
  <select>
    Yes
      Did you give permission to the caller/business to call you in writing?
        <select>
          Yes
          No
      Date you provided permission to the caller/company to call
        <input[date]> (MUST BE IN FORMAT 'January, 1, 2018')
    No
    Uncertain

Date of Your Issue/Problem 
  <input[date]>
Time of Your Issue/Problem 
  <input[time]>
Type of Call or Message 
  <select>
    Abandoned Calls
    Live Voice
    Prerecorded voice
    Text Message
Did you receive Caller ID Information?
  <select>
    Yes
      Caller ID Number 
        <input[text]> (555-555-5555)
      Caller ID Name 
        <input[text]>
    No
    Don't have caller id
    Uncertain
    
Was the caller's business name provided during the call/message? 
  <select>
    Yes
      Was the business name provided at the beginning of the call/message?
        <select>
          Yes
          No
      Please provide the name of the advertiser provided during the call
        <input[text]>
    No
    Uncertain
Provide the advertiser's phone number given during the call.
  <input[text]> (555-555-5555)

*/