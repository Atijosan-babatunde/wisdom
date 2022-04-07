import React, { Component } from 'react';

export default function ConnectivityListener (ComposedComponent) {
    class ConnectivityListener extends Component {
        state = { isOffline: window ? !window.navigator.onLine : false, hide: null }

        componentDidMount() {
            this.handleConnectionChange();
            window.addEventListener('online', this.handleConnectionChange);
            window.addEventListener('offline', this.handleConnectionChange);
        }

        componentWillUnmount() {
            window.removeEventListener('online', this.handleConnectionChange);
            window.removeEventListener('offline', this.handleConnectionChange);
        }

        handleConnectionChange = () => {
            console.log('Connection Change');
            // const condition = window ? window.navigator.onLine : false;
            // if (condition) {
            //     const webPing = setInterval(() => {
            //         fetch(`${process.env.REACT_APP_BASE_API}`, {
            //             mode: 'no-cors',
            //         }).then(() => {
            //             this.setState({ isOffline: false }, () => {
            //                 if (!this.state.isOffline && this.state.hide) this.state.hide();
            //                 this.setState({ hide: null }, () => {
            //                     clearInterval(webPing);
            //                 })
            //             })
            //         }).catch(() => {
            //             if (!this.state.isOffline) {
            //                 this.setState({ isOffline: true }, () => {
            //                     const { hide } = cogoToast.warn("Unable to reach web service", { hideAfter: 0, position: "top-center" })
            //                     this.setState({ hide: hide })
            //                 });
            //             }
            //         })
            //     }, 2000);
            //     return;
            // } else {
            //     this.setState({ isOffline: true }, () => {
            //         const { hide } = cogoToast.error("No internet connection", { hideAfter: 0, position: "top-center" })
            //         this.setState({ hide: hide })
            //     });
            //     return;
            // }
        }


        render() {
            const { isOffline } = this.state;
            return <ComposedComponent {...this.props} isOffline={isOffline} />;
        }
    }

    return ConnectivityListener;
}
