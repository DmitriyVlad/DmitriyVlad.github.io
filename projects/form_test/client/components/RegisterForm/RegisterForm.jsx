import React, { Component } from 'react';
import './RegisterForm.css';

export default class RegisterForm extends Component {
  constructor() {
    super();

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }

  handleSubmit(e) {
    e.preventDefault();

    const userData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone
    };

    fetch('/user', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      cache: 'default',
      method: 'POST',
      body: JSON.stringify(userData)
    })
      .then(blob => blob.json())
      .then(data => {
        alert('Data received, check your console!');
        console.log(data);
      })
      .catch(error => console.log(`There has been a problem with your fetch operation: ${error.message}`));
  }

  render() {
    return (
      <div className="register">
        <form 
          action="" 
          className="register__form"
          onSubmit={this.handleSubmit}
        >
          <div className="register__row">
            <label htmlFor="firstName" className="register__label">First Name</label>
            <input 
              type="text" 
              className="register__control"
              name="firstName"
              placeholder="Your first name"
              required={true}
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </div>
          <div className="register__row">
            <label htmlFor="lastName" className="register__label">Last Name</label>
            <input 
              type="text"
              className="register__control"
              name="lastName"
              placeholder="Your last name"
              required={true}
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </div>
          <div className="register__row">
            <label htmlFor="email" className="register__label">Email</label>
            <input 
              type="email"
              className="register__control"
              name="email"
              placeholder="Your email"
              required={true}
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="register__row">
            <label htmlFor="phone" className="register__label">Phone Number</label>
            <input 
              type="tel"
              className="register__control"
              name="phone"
              placeholder="Your phone number"
              required={true}
              value={this.state.phone}
              onChange={this.handleChange}
            />
          </div>
          <input 
            type="submit" 
            value="SEND" 
            className="register__button"
          />
        </form>
      </div>
    );
  }
}