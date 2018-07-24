// Render Prop
import React from 'react';
import { Formik } from 'formik';

import { addPred } from '../actions/pred-actions.js';
// import Button from '@material-ui/core/Button';
import '../css/addForm.css';
import TestInput from './TestInput.jsx';
import MatAddButton from './MatAddButton.jsx';
// import Image from './Image.jsx';

import { getDateString } from '../api/datefuncs.js';

// import addCross from '../images/add-cross.png';

const FormikBasic = ( props ) => {

  let { user } = props;
  // console.log("FormikBasic user:", user);

  // get Minimum date

  // let buttonStyle = {
  //   backgroundColor : 'blue',
  //   height: '50px',
  //   width: '50px',
  //   borderRadius: '50%',
  //   color: 'white',
  //   borderStyle: 'solid',
  //   display: 'flex',
  //   justifyContent: 'centre',
  //   alignItems: 'centre'
  //
  //
  // };


  return (

    <Formik
      initialValues={{
        // long: '',
        short: '',
        dateTime: '',
        dateTime2: ''
      }}
      validate={values => {
        // same as above, but feel free to move this into a class method now.
        let errors = {};

        if (!values.short) {
          errors.short = 'Required'
        }
        if (!values.dateTime) {
          errors.dateTime = 'Required'
        }
        return errors;
      }}
      onSubmit={(
        values,
        { setSubmitting, setErrors, resetForm /* setValues and other goodies */ }
      ) => {
        console.log("Form submitted...");
        addPred(user, values.short, values.dateTime).then(result => {
          setSubmitting(false);
          resetForm();
        }, errors => {});

      }}
      render={({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        isSubmitting,
        isValid
      }) => {

        // Check if fields are touched
        // console.log("Touched:", touched);

        // Set date input field color
        // let inputColor = 'purple';
        //
        // let inputStyle = {
        //   color: inputColor
        // }


        // if (values.dateTime === '') { // if dateTime has not been set
        //   inputStyle = {color: 'tomato'};  // set as warning color if not set
        // }
        // else {
        //   inputStyle = {color: 'blue'}; // else set to active color
        // }

        // console.log("Touched:", touched);
        // let datePlaceholder = getDateString(new Date());

        // <div className='buttonDiv'>
        //
        //   <button type="submit" disabled={isSubmitting || !isValid}>
        //     <Image src={addCross} height={25} width={25}/>Call it
        //
        //   </button>
        //   {/*variant="contained" color="primary"*/}
        //
        //
        // </div>


        return (



            <form autoComplete="off" onSubmit={handleSubmit}>
            <div className='addPredPage'>
              <h3 className='addPredPageItem'>New Item</h3>
              <p className='addPredPageItem'>Call made by {user.firstname}</p>
              {/* <MyCSSInput /> */}
            <TestInput

              name="short"
              type="textarea"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.short || ''}
              placeholder='Enter details...'

            />
            <TestInput

              name="dateTime"
              type="date"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.dateTime || ''}
              min={getDateString(new Date())}
              title="Expiry"

            />

          <MatAddButton isSubmitting={isSubmitting} isValid={isValid}/>


          </div>
        </form>


      )}}
    />
)};

export default FormikBasic;
