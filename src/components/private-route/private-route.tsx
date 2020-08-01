import React from "react";
import {Route, Redirect, RouteProps} from "react-router-dom";
import {connect} from "react-redux";

import {AuthorizationStatus} from "../../reducers/user/user-reducer";
import {getUserStatus} from "../../reducers/user/selectors";
import {AppRoute} from "../../const.js";

type Props = RouteProps & {
  userStatus: string;
  render: () => React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({render, path, exact, userStatus}: Props) => {
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

const mapStateToProps = (state) => ({
  userStatus: getUserStatus(state)
});


export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
