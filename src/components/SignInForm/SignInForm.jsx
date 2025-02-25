import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';

import { signIn } from '../../services/authService';

import { UserContext } from '../../contexts/UserContext';
import '../../css/SignInForm.css'
import '../../css/SignInForm.css'

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const signedInUser = await signIn(formData);

      await setUser(signedInUser);
      navigate('/')
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className='signin-container'>
      <div className='signin-left'>
        <img id='baadir-logo' src="src/images/Logo.png" alt="Baadir logo" />
        <p id='slogan'>Unlock your fun experience with <br></br>every opportunity you take!</p>
        <img id='volunteer-illustration' src="src/images/auth-image.png" alt="volunteer-illustration" />
      </div>
      <div className='signin-right'>
    <div className='signin-container'>
      <div className='signin-left'>
        <img id='baadir-logo' src="src/images/Logo.png" alt="Baadir logo" />
        <p id='slogan'>Unlock your fun experience with <br></br>every opportunity you take!</p>
        <img id='volunteer-illustration' src="src/images/auth-image.png" alt="volunteer-illustration" />
      </div>
      <div className='signin-right'>
      <p>{message}</p>
      <form className='signin-form' autoComplete='off' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>email</label>
          <label htmlFor='email'>email</label>
          <input
            type='text'
            autoComplete='off'
            id='email'
            value={formData.email}
            name='email'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>password</label>
          <label htmlFor='password'>password</label>
          <input
            type='password'
            autoComplete='off'
            id='password'
            value={formData.password}
            name='password'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button className='signin-button'>Sign In</button>
          {/* <button onClick={() => navigate('/')}>Cancel</button> */}
          <p>Don't have an account? <a href='/sign-up' className='signin-link'>Sign up</a></p>
        </div>
      </form>
      </div>
    </div>
    );
      </div>
    </div>
    );
};

export default SignInForm