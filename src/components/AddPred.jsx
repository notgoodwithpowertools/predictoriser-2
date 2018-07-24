import React from 'react';
import {connect} from 'react-redux';
// import '../css/addForm.css';
import FormikBasic from './FormikBasic.jsx';
import Predboard from './Predboard.jsx';

export class AddPred extends React.Component {

  render () {
    var { user } = this.props;
    return (
      <div>
        <FormikBasic user={user}/>
        <Predboard sort='user' />
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      user: state.user
    };
    //return state;
  }
)(AddPred);
