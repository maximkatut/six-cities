import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import {AuthorizationStatus} from "../../reducers/user/user-reducer";
import {getUserStatus} from "../../reducers/user/selectors";
import {AppRoute} from "../../const.js";


const PrivateRoute = ({render, path, exact, userStatus}) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        return (
          userStatus === AuthorizationStatus.AUTH
            ? render()
            : <Redirect to={AppRoute.LOGIN} />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  userStatus: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userStatus: getUserStatus(state)
});


export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
