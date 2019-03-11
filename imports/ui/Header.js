import React from 'react';
import { Accounts} from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';

export const Header = (props) => {
  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
        <button className="button button--link-text" onClick={() => {
          props.handleLogout();
          props.history.push('/');
        }}>Log out</button>
      </div>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default withRouter(withTracker(() => {
  return {
    handleLogout: () => Accounts.logout(),
  };
})(Header));
