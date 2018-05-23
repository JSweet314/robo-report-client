import React, { Component } from 'react';
import NewUserWelcome from '../../components/NewUserWelcome';
import NewUserForm from '../../components/NewUserForm';
import './style.css';

export default class NewUserContainer extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      phone: '',
      phoneType: '-',
      phoneLocation: '-',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      welcomeDisplayed: true
    };
  }

  toggleWelcome = () => {
    this.setState({ welcomeDisplayed: !this.state.welcomeDisplayed });
  }

  handleOnChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  render() {
    const { welcomeDisplayed } = this.state;
    return (welcomeDisplayed ?
      <NewUserWelcome toggleWelcome={this.toggleWelcome}/>
      :
      <NewUserForm 
        values={this.state}
        handleSubmit={this.handleSubmit}
        handleOnChange={this.handleOnChange}/>
    );
  }
}