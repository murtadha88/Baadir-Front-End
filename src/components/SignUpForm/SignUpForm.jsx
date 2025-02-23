import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { signUp } from '../../services/authService'

import { UserContext } from '../../contexts/UserContext'
import '../../css/SignUpForm.css'

const SignUpForm = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext)
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: 0,
    role: 'Volunteer',
    password: '',
    passwordConf: '',
  });

  const { name, email, phone, role, password, passwordConf } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
        const newUser = await signUp(formData)
        setUser(newUser)
        navigate('/')
    } catch (err) {
        setMessage(err.message)
    }
  };

  const isFormInvalid = () => {
    return !(name && password && password === passwordConf);
  };

  return (
    <>
    <img id='baadir-logo' src="src/images/Logo.png" alt="Baadir logo" />
    <img id='volunteer-illustration' src="src/images/auth-image.png" alt="volunteer-illustration" />
      <p id='slogan'>Unlock your fun experience with <br></br>every opportunity you take!</p>
    <main className='signup-form'>
      {/* <h1>Sign Up</h1> */}
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div className='name-group'>
          <label htmlFor='name' id='name-label'>name:</label>
          <input
            type='text'
            id='name'
            value={name}
            name='name'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='email' id='email-label'>Email:</label>
          <input
            type='text'
            id='email'
            value={email}
            name='email'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='phone'id='phone-label'>Phone:</label>
          <input
            type='number'
            id='phone'
            value={phone}
            name='phone'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='role' id='role-label'>Role:</label>
          <select name="role" id="role" value={role} onChange={handleChange}>
            <option value="Company">Company</option>
            <option value="Volunteer">Volunteer</option>
          </select>
        </div>
        <div>
          <label htmlFor='password' id='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            name='password'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='confirm' id='confirm-password'>Confirm Password:</label>
          <input
            type='password'
            id='confirm'
            value={passwordConf}
            name='passwordConf'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button disabled={isFormInvalid()}>Sign Up</button>
          {/* <button onClick={() => navigate('/')}>Cancel</button> */}
        </div>
        <p>Already have an account?</p>
      </form>
    </main>
    </>
  );
};

export default SignUpForm