import React, {useState} from 'react';
import Login from './Login';
import SignUp from './SignUp';
// import { Button } from 'react-bootstrap';

const AuthPage = () => {
    const [isLogin , setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

  return (
    <div className="container mt-5">
        <h1 className="text-center mb-4">{isLogin ? "login" : "SignUp"}</h1>
        {isLogin ? <Login /> : <SignUp />}
        <div className="text-center mt-3">
            <button className='btn btn-link' onClick={toggleForm}>{isLogin ? "Don't have an account? SignUp" : "Already have an account? Login"}</button>
        </div>
    </div>
  );
};

export default AuthPage;