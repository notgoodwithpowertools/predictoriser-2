
import React from 'react';

import {
  //BrowserRouter as Router,
  //Route,
  Link
} from 'react-router-dom';

// import github_sm from '../images/github-sm.png';
import signup from '../images/signup.png';
import signin from '../images/signin2.png';
import Image from './Image.jsx';


// import Login from './Login.jsx';
import '../css/landing.css';
// import '../css/button.css';

// Refactor to stateless functional Component
var LandingPage = (props) => {

  const styles = {
    textDecoration: "none"
  };

  return (

    <div className="landing">
      <div className="lpHeadingPanel">
        <h1 className='lpHeading'>The Predictoriser</h1>
      </div>
      <div className="lpButtonsPanel">
        <Link style={styles} to='/login'><button className="button3"><Image src={signin} height={30} width={30}/><p className='button3_item'>Sign In</p></button></Link>
        <Link style={styles} to='/register'><button className="button3"><Image src={signup} height={30} width={30}/><p className='button3_item'>Sign Up</p></button></Link>
        {/*<Link className="button3" to='/login'>Sign in</Link>
        <Link className="button3"to='/register'>Register</Link> */}

      </div>
    </div>

  )
};

export default LandingPage;
