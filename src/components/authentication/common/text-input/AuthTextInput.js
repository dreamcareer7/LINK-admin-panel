import React from 'react';
import PropTypes from 'prop-types';

function AuthTextInput(props) {
    const {onChange, value, onKeyPress, placeholder, type, src, ...restProps} = props;
    const onEnterKey = (e) => {
          if(e.keyCode === 13) {
              onKeyPress()
          }
    }
    return (
            <div className="form--detail-container">
                <div className="detail-icon">
                    <img alt="" src={src}/>
                </div>
                <input className="" type={type} onChange={onChange} value={value} placeholder={placeholder}
                       onKeyDown={onEnterKey}
                        {...restProps}
                       onFocus={(e) => {e.target.placeholder = ""}}
                       onBlur={(e) => {e.target.placeholder = placeholder}}/>
            </div>
    );
}

AuthTextInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string,
    src: PropTypes.element,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onKeyPress: PropTypes.func.isRequired
};
AuthTextInput.defaultProps = {
    type: 'text',
    src: '',
};

export default AuthTextInput;
