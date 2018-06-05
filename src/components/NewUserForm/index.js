import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { states } from '../../helpers';

const NewUserForm = ({ handleOnChange, handleOnSubmit, values }) => {
  const {
    email,
    phone,
    phoneType,
    phoneLocation,
    firstName,
    lastName,
    address,
    city,
    state,
    zipcode
  } = values;

  const stateOptions = states.map(state => 
    <option key={`state-${state}`} value={state}>{state}</option>
  );

  return (
    <form className='new-user-form'
      onSubmit={event => handleOnSubmit(event)}>
      <label htmlFor='firstName'>First Name:</label>
      <input
        required
        value={firstName}
        onChange={event => handleOnChange(event)}
        id='firstName'
        type='text' />
      <label htmlFor='lastName'>Last Name:</label>
      <input
        required
        value={lastName}
        onChange={event => handleOnChange(event)}
        id='lastName'
        type='text' />
      <label htmlFor="">Email:</label>
      <input
        required
        value={email}
        onChange={event => handleOnChange(event)}
        id='email'
        type='email' />
      <fieldset className='user-report-form__fieldset'>
        <legend>Your Address</legend>
        <label htmlFor='address'>Street Address:</label>
        <input
          required
          value={address}
          onChange={event => handleOnChange(event)}
          id='address'
          type='text' />
        <label htmlFor='city'>City:</label>
        <input
          required
          value={city}
          onChange={event => handleOnChange(event)}
          id='city'
          type='text' />
        <label htmlFor='state'>State:</label>
        <select
          required
          value={state}
          onChange={event => handleOnChange(event)}
          id='state' >
          <option value='-'>-</option>
          {stateOptions}
        </select>
        <label htmlFor='zipcode'>Zip Code</label>
        <input
          required
          value={zipcode}
          onChange={event => handleOnChange(event)}
          id='zipcode'
          type='text' />
      </fieldset>
      <fieldset className='user-report-form__fieldset'>
        <legend>Your Phone</legend>
        <label htmlFor='phone'>Phone Number:</label>
        <input
          required
          value={phone}
          onChange={event => handleOnChange(event)}
          id='phone'
          type='tel' />
        <label htmlFor='phoneType'>Phone Type: </label>
        <select
          required
          value={phoneType}
          onChange={event => handleOnChange(event)}
          id="phoneType">
          <option value='-'>-</option>
          <option
            value="Wireless (cell phone/other mobile device)">
            Wireless (cell phone/other mobile device)
          </option>
          <option value="Wired">Wired</option>
          <option value="Internet (VOIP)">Internet (VOIP)</option>
        </select>
        <label htmlFor="">Phone Location:</label>
        <select
          required
          value={phoneLocation}
          onChange={event => handleOnChange(event)}
          id="phoneLocation">
          <option value='-'>-</option>
          <option
            value="Residential/Personal">
              Residential/Personal
          </option>
          <option
            value="Business 
              (including government and nonprofit organizations)">
              Business (including government and nonprofit organizations)
          </option>
          <option
            value="Patient Room in Health Care of Elderly Care Facility">
              Patient Room in Health Care of Elderly Care Facility
          </option>
          <option value="Toll Free Line">Toll Free Line</option>
        </select>
      </fieldset>
      <button className='new-user-form__submit'>Start Reporting!</button>
    </form>
  );
};

NewUserForm.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  handleOnSubmit: PropTypes.func.isRequired,
  values: PropTypes.shape({
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    phoneType: PropTypes.string.isRequired,
    phoneLocation: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    zipcode: PropTypes.string.isRequired
  })
};

export default NewUserForm;