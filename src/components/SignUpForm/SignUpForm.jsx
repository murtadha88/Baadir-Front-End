import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { signUp } from '../../services/authService'

import { UserContext } from '../../contexts/UserContext'
import '../../css/SignUpForm.css'
import '../../css/SignInForm.css';

import auth from "../../images/auth-image.png";
import Logo from "../../images/Logo.png";


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
    <div className='auth-container'>
      <div className='auth-left'>
        <img id='baadir-logo' src={Logo} alt="Baadir logo" />
        <p className='slogan'>Unlock your fun experience with <br></br>every opportunity you take!</p>
        <img id='volunteer-illustration' src={auth} alt="volunteer-illustration" />
      </div>

      <div className='auth-right'>
        <main className='auth-form'>
          <p id='signup-message'>{message}</p>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='name' id='label-name'>name</label>
              <input
                type='text'
                id='name'
                value={name}
                name='name'
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='email' id='label-email'>email</label>
              <input
                type='text'
                id='email'
                value={email}
                name='email'
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='phone' id='label-phone'>phone</label>
              <input
                type='tel'
                id='phone'
                value={phone}
                name='phone'
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='role' id='label-role'>role</label>
              <select name="role" id="role" value={role} onChange={handleChange}>
                <option value="Company">Company</option>
                <option value="Volunteer">Volunteer</option>
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='password' id='label-password'>password</label>
              <input
                type='password'
                id='password'
                value={password}
                name='password'
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='confirm' id='label-confirm'>confirm password</label>
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
              <button className='auth-button' disabled={isFormInvalid()}>Sign Up</button>
            </div>
            <p className='auth-link'>Already have an account?  <Link to='/sign-in' >Sign in</Link></p>
          </form>
        </main>
      </div>
    </div>
  );
};

export default SignUpForm