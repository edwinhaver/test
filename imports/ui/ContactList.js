import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import Header from './Header';

export class ContactList extends React.Component {
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
            <tr>
              <td>Edwin</td>
              <td>Haver</td>
              <td>Chief Information Officer</td>
              <td>edwin.haver@gmail.com</td>
              <td>+971 4 453 3198</td>
              <td>+971 50 458 0892</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired
};

export default withTracker(() => {
  return {
    contacts: []
  };
})(ContactList);
