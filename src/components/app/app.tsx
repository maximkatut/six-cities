import React from 'react';
import Notifications, {notify} from 'react-notify-toast';
import {connect} from 'react-redux';
import {Router, Route, Switch, Redirect} from 'react-router-dom';

import {getErrorStatus} from '../../reducers/data/selectors';
import history from '../../history';

import Main from '../main/main';
import Offer from '../offer/offer';
import SignIn from '../sign-in/sign-in';
import FavoritesList from '../favorites-list/favorites-list';
import PrivateRoute from '../private-route/private-route';

interface Props {
  isError: {
    status: boolean;
    message: string;
  };
}

const App: React.FC<Props> = ({isError}: Props) => {
  return (
    <Router history={history}>
      <Notifications />
      {isError.status && notify.show(`${isError.message}`, `error`)}
      <Switch>
        <PrivateRoute
          exact
          path="/favorites"
          render={() => {
            return <FavoritesList />;
          }}
        />
        <Route exact path="/offer/:id?" component={Offer} />
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/:city?" component={Main} />
        <Redirect path="" to="/" />
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  isError: getErrorStatus(state)
});

export default connect(mapStateToProps, null)(App);
