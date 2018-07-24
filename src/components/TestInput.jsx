import React from 'react';
import '../css/mycssinput.css';

// const MyCSSInput = ( props ) => {
class TestInput extends React.Component {

  render () {

    var {name, onChange, onBlur, value, placeholder, title, color, type, min} = this.props;

    // if (value === '') {
    //   color = 'tomato'
    // }
    // else {
    //   color = 'blue'
    // }

    color = (value === '') ? 'tomato' : 'blue';

    // var inputStyle = {
    //   color: color || 'blue',
    // };
/*
    <div className='group'>
      <input type='text' style={inputStyle} className={validateClass()} onFocus={() => this.handleFocus('info')} onChange={this.handleChange} onBlur={this.handleBlur} value={val}/>
      <span className='bar'></span>
      <label>Title</label>
    </div>

*/
    return (
      <div className='group'>
        <input

          type={type}
          name={name}
          style={{color: color}}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={placeholder}
          min={min}

        />
        <span className='bar'></span>
        <label>{title || 'Title'}</label>
      </div>
    )

  }


}

export default TestInput;
