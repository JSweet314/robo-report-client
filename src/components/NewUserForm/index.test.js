import React from 'react';
import { shallow } from 'enzyme';
import NewUserForm from './index';

describe('NewUserForm', () => {
  let wrapper, 
    mockValues, 
    mockEvent, 
    mockHandleOnChange, 
    mockHandleOnSubmit;

  beforeEach(() => {
    mockValues = {
      email: '',
      phone: '',
      phoneType: '',
      phoneLocation: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zipcode: ''
    };
    mockHandleOnChange = jest.fn();
    mockHandleOnSubmit = jest.fn();
    mockEvent = {
      preventDefault: jest.fn(),
      target: {
        id: 'firstName',
        value: 'Jeffery'
      }
    };
    wrapper = shallow(
      <NewUserForm
        handleOnSubmit={mockHandleOnSubmit}
        handleOnChange={mockHandleOnChange}
        values={mockValues} />
    );
  });

  it('should match a snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleOnSubmit on form submission', () => {
    const form = wrapper.find('form');
    form.simulate('submit', mockEvent);
    expect(mockHandleOnSubmit).toHaveBeenCalledWith(mockEvent);
  });

  it('should call handleOnChange when an input or select is changed', () => {
    const inputs = wrapper.find('input');
    inputs.forEach(input => input.simulate('change', mockEvent));
    expect(mockHandleOnChange).toHaveBeenCalledTimes(8);
  });

  it('should call handleOnChange when a select box is changed', () => {
    const selects = wrapper.find('select');
    selects.forEach(select => select.simulate('change', mockEvent));
    expect(mockHandleOnChange).toHaveBeenCalledTimes(2);
  });
});