import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import Header from './Header';
import { Contacts } from './../api/contacts';

export class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      designation: '',
      email: '',
      phone: '',
      mobile: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // this.setState({ [event.target.name]: event.target.value });
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    let fields = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      designation: this.state.designation,
      email: this.state.email,
      phone: this.state.phone,
      mobile: this.state.mobile
    };

    this.props.meteorCall('contacts.insert', fields);
  }

  renderContactListItems() {
    return this.props.contacts.map((contact) => {
      return (
        <tr key={contact._id}>
          <td>{contact.firstName}</td>
          <td>{contact.lastName}</td>
          <td>{contact.designation}</td>
          <td>{contact.email}</td>
          <td>{contact.phone}</td>
          <td>{contact.mobile}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <Header title="Test"/>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Designation</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Mobile</th>
            </tr>
          </thead>
          <tbody>
            {this.renderContactListItems()}
          </tbody>
        </table>
        <form onSubmit={this.handleSubmit.bind(this)} noValidate>
          <input type="text" ref="firstName" name="firstName" placeholder="First name" onChange={this.handleChange}/>
          <input type="text" ref="lastName" name="lastName" placeholder="Last name" onChange={this.handleChange}/>
          <input type="text" ref="designation" name="designation" placeholder="Designation" onChange={this.handleChange}/>
          <input type="email" ref="email" name="email" placeholder="Email" onChange={this.handleChange}/>
          <input type="text" ref="phone" name="phone" placeholder="Phone" onChange={this.handleChange}/>
          <input type="text" ref="mobile" name="mobile" placeholder="Mobile" onChange={this.handleChange}/>
          <button className="button">Save</button>
        </form>
      </div>
    );
  }
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  meteorCall: PropTypes.func.isRequired
};

export default withTracker(() => {
  Meteor.subscribe('contacts');

  return {
    contacts: Contacts.find().fetch(),
    meteorCall: Meteor.call,
  };
})(ContactList);
