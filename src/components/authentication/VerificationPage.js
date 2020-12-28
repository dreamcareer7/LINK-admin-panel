import React, {useState} from 'react';
import linkFluencer from "../../assets/images/linkfluencer.png";
import user from "../../assets/images/user.png";

function VerificationPage() {
    const [verificationCode,setVerificationCode] = useState('');

    const onClickVerify = (verificationCode) =>{
        console.log("VERIFICATION->",verificationCode);
        setVerificationCode('');
    }

    return(
        <div className="login-content-container">
            <img alt="linkfluencer" src={linkFluencer} className="logo"/>
            <div className="login-form">

                <div className="login-form--detail-container">
                    <input type="text"
                           placeholder="Enter verification code"
                           value={verificationCode}
                           onChange={e => setVerificationCode(e.target.value.toString().trim())}
                    />
                </div>
                <button className="button success-button login-button"
                        onClick={() => onClickVerify(verificationCode)}>
                    VERIFY
                </button>
            </div>
        </div>
    );
}
export default VerificationPage;