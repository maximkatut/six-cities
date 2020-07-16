import React from 'react';
import {string} from 'prop-types';
import {Link} from 'react-router-dom';
import {getUserEmail, getUserStatus} from '../../reducers/user/selectors';
import {connect} from 'react-redux';

import {AuthorizationStatus} from '../../reducers/user/user-reducer';

const Header = (props) => {
  const {email, userStatus} = props;
  const isUserLogged = (userStatus === AuthorizationStatus.AUTH) ? true : false;
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to="/">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link className="header__nav-link header__nav-link--profile" to={isUserLogged ? `/favorites` : `/login`}>
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__login">{isUserLogged ? `${email}` : `Sign in`}</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  email: string.isRequired,
  userStatus: string.isRequired
};

const mapStateToProps = (state) => ({
  email: getUserEmail(state) || ``,
  userStatus: getUserStatus(state)
});

export default connect(mapStateToProps, null)(Header);
