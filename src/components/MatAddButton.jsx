import React from 'react';

import '../css/addForm.css';
import '../css/matAddButton.css';
// import Image from './Image.jsx';
import addCross from '../images/add-cross.png';

const MatAddButton = (props) => {

  var { isSubmitting, isValid } = props;
  // <Image src={addCross} height={30} />
  return (
      <div className='matAddButton' >
      <button className='matAddButton' type="submit" disabled={isSubmitting || !isValid}>
        <img src={addCross} alt=''/>
      </button>
      </div>
  );
}

export default MatAddButton;
