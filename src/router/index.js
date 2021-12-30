import React from 'react';
import { Route, Switch, Router, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { fetchCookie } from '../helpers/cookie';
import * as Pages from '../web/pages';

import ConnectivityListener from './ConnectivityListener';


function Approuter({ history }) {
    return (
        <Router history={history}>
            <TransitionGroup className="RTG">
                <CSSTransition className="fade" key={1} timeout={600}>
                    <Switch>
                        <SessionRoute pathRedirect='/dashboard/' exact path='/' component={Pages.Authenticate} />
                        <SessionRoute pathRedirect='/dashboard/' path='/forgot-password/' exact component={Pages.ForgetPass} />
                        <SessionRoute pathRedirect='/dashboard/' path='/get-started/' exact component={Pages.CreateAccount} />
                        <SessionRoute pathRedirect='/dashboard/' path='/reset/:token/' exact component={Pages.ResetPassword} />
                        <SessionRoute pathRedirect='/business-information/' path='/verify-email/' exact component={Pages.EmailVerification} />

                        <PrivateRoute path='/business-information/' exact component={Pages.UploadDocument} />
                        <PrivateRoute path='/bank-information/' exact component={Pages.EnterAccountDetails} />
                        <PrivateRoute path='/social-profile/' exact component={Pages.SocialAccount} />
                        <PrivateRoute path="/dashboard/" component={Pages.Landing} />
                        <PrivateRoute path='/applications/' component={Pages.Client} />
                        <PrivateRoute path='/create-application/' exact component={Pages.NewClient} />
                        <PrivateRoute path='/customers/' component={Pages.Ticketed} />
                        <PrivateRoute path='/account/' exact component={Pages.Account} />
                        <PrivateRoute path='/faq/' exact component={Pages.Faq} />
                        <PrivateRoute path='/payouts/' exact component={Pages.Payout} />

                        <Route component={Pages.NotFound} />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
            <Switch>
                <PrivateRoute path="/dashboard/:id/" exact component={Pages.SingleApplication} />
                <PrivateRoute path="/applications/:id/" exact component={Pages.SingleApplication} />
                <PrivateRoute path="/customers/:id/" exact component={Pages.SingleApplication} />

            </Switch>
        </Router>
    )
}



const PrivateRoute = ({ component: Component, ...rest }) => {
    const auth = {
        isAuthenticated: fetchCookie('1Q_SPA') ? true : false,
    }

    // Use getMerchant profile here in combination with useSessionstorage to persist user data

    // if (auth.isAuthenticated && auth.isAuthorized === 'false') removeCookie('token')
    return (
        <Route {...rest} render=
            {props => auth.isAuthenticated ?
                (<Component {...props} />) :
                (<Redirect to={{ pathname: "/", state: { from: props.location } }} />)
            }
        />
    );
}

const SessionRoute = ({ component: Component, session, ...rest }) => {
    const auth = {
        isAuthenticated: fetchCookie('1Q_SPA') ? true : false,
    }
    return (
        <Route {...rest} render=
            {props => auth.isAuthenticated ?
                (<Redirect to={{ pathname: rest.pathRedirect, state: { from: props.location } }} />) :
                (<Component {...props} />)
            }
        />
    );
}

export default ConnectivityListener(Approuter);