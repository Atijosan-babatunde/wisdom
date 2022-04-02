import React, { useEffect } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { fetchCookie } from '../helpers/cookie';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getMerchantProfile } from '../services/users';
import * as Pages from '../web/pages';
import ConnectivityListener from './ConnectivityListener';


function Approuter({ history }) {
    return (
        <Router history={history}>

            <Switch>
                <Route pathRedirect='/dashboard/' exact path='/' component={Pages.Authenticate} />
                <Route pathRedirect='/dashboard/' path='/forgot-password/' exact component={Pages.ForgetPass} />
                <Route pathRedirect='/dashboard/' path='/get-started/' exact component={Pages.CreateAccount} />
                <Route pathRedirect='/dashboard/' path='/reset/:token/' exact component={Pages.ResetPassword} />
                <Route pathRedirect='/business-information/' path='/verify-email/' exact component={Pages.EmailVerification} />

                <Route path='/business-information/' exact component={Pages.UploadDocument} />
                <Route path='/bank-information/' exact component={Pages.EnterAccountDetails} />
                <Route path='/social-profile/' exact component={Pages.SocialAccount} />
                <Route path="/dashboard/" component={Pages.Landing} />
                <Route path='/applications/' component={Pages.Client} />
                <Route path='/create-application/' exact component={Pages.NewClient} />
                <Route path='/customers/' component={Pages.Ticketed} />
                <Route path='/account/' component={Pages.Account} />
                <Route path='/faq/' exact component={Pages.Faq} />
                <Route path='/payouts/' exact component={Pages.Payout} />
                <Route path='/campaigns/' exact component={Pages.Campaigns} />

                <Route component={Pages.NotFound} />
            </Switch>
            <Switch>
                <PrivateRoute path="/dashboard/:id/" exact component={Pages.SingleApplication} />
                <PrivateRoute path="/applications/:id/" exact component={Pages.SingleApplication} />
                <PrivateRoute path="/customers/:id/" exact component={Pages.SingleApplication} />
                <PrivateRoute path="/account/verify-phone/" exact component={Pages.VerifyPhone} />
                <PrivateRoute path="/account/add-bank/" exact component={Pages.AddBank} />
            </Switch>
        </Router>
    )
}



const PrivateRoute = ({ component: Component, ...rest }) => {
    console.log("Mounted Private...")
    const [user, setUser] = useSessionStorage("user", {});
    const [merchant, setMerchant] = useSessionStorage("merchant", {});
    const auth = {
        isAuthenticated: fetchCookie('1Q_SPA') ? true : false,
    };
      
    if (auth.isAuthenticated && (!typeof user === 'object' || Object.keys(user).length <= 0) && (!typeof merchant === 'object' || Object.keys(merchant).length <= 0)){
        console.log("Calling merchants....")
        getMerchantProfile().then((re) => {
            const { payload: { user: u, merchant: m} } = re;
            setUser(u);
            setMerchant(m);
        }).catch(() => {
            auth.isAuthenticated = false;
            // removeCookie('_token')
        });
    }

    
	// const rf = useCallback(() => {
	// 	console.log("USE RF CALLBACK")
	// 	if ((user && Object.keys(user).length <= 0) || (merchant && Object.keys(merchant).length <= 0)) {
	// 		getMerchantProfile().then((res) => {
	// 			if (res.status === HttpStatus.OK) {
	// 				setUser(res.payload.user)
	// 				setMerchant(res.payload.merchant)
	// 			}
	// 			// else Logout
	// 		}).catch(() => {
	// 			// Logout
	// 		})
	// 	}
	// }, [merchant, user, setUser, setMerchant]);
	
	// useEffect(() => {
	// 	console.log("USE RF")
	// 	rf();
	// }, [rf]);

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