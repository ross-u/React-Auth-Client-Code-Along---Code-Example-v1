//	lib/AuthProvider.js

import React from "react";
import auth from "./auth-service";				// IMPORT functions for axios requests to API
const { Consumer, Provider } = React.createContext();

// HOC to create Consumer
const withAuth = (WrappedComponent) => {

  return class extends React.Component {
    render() {
      
      return (
        <Consumer>
{/* <Consumer> component provides callback which receives Providers "value" object */}  
        { 
          ({login, signup, user, logout, isLoggedin}) => {
          return (
            <WrappedComponent 
              login={login} 
              signup={signup} 
              user={user}
              logout={logout}
              isLoggedin={isLoggedin}
              {...this.props} />
          );
        }}
        </Consumer>
      );
    }
  };
};

// Provider
class AuthProvider extends React.Component {
  state = { isLoggedin: false, user: null, isLoading: true };

	componentDidMount() {
    auth.me()
    .then((user) => this.setState({ isLoggedin: true, user: user, isLoading: false }))
    .catch((err) => this.setState({ isLoggedin: false, user: null, isLoading: false }));
  }

  signup = (user) => {
    const { username, password } = user;
    
    auth.signup({ username, password })
      .then((user) => this.setState({ isLoggedin: true, user}) )
      .catch(({response}) => this.setState({ message: response.data.statusMessage}));
  };

  login = (user) => {
    const { username, password } = user;

    auth.login({ username, password })
      .then((user) => this.setState({ isLoggedin: true, user }))
      .catch((err) => console.log(err));
  };
	
	logout = () => {
    auth.logout()
    .then(() => this.setState({ isLoggedin: false, user: null }))
    .catch((err) => console.log(err));
  };
	
  render() {
    const { isLoading, isLoggedin, user } = this.state;
    const { login, logout, signup } = this;
    
    return (
      isLoading ? 
      <div>Loading</div> 
      : 						
      (<Provider value={{ isLoggedin, user, login, logout, signup}} >
         {this.props.children}
      </Provider>)
    )
  }
}

export { Consumer, withAuth };

export default AuthProvider;