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
    <div className='signup-container'>
      <div className='signup-left'>
    <img id='baadir-logo' src="src/images/Logo.png" alt="Baadir logo" />
    <p id='slogan'>Unlock your fun experience with <br></br>every opportunity you take!</p>
    <img id='volunteer-illustration' src="src/images/auth-image.png" alt="volunteer-illustration" />
    </div>
    <div className='signup-right'>
    <main className='signup-form'>
      {/* <h1>Sign Up</h1> */}
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div className='input-group'>
          <label htmlFor='name'>name</label>
          <input
            type='text'
            id='name'
            value={name}
            name='name'
            onChange={handleChange}
            required
          />
        </div>
        <div className='input-group'>
          <label htmlFor='email'>email</label>
          <input
            type='text'
            id='email'
            value={email}
            name='email'
            onChange={handleChange}
            required
          />
        </div>
        <div className='input-group'>
          <label htmlFor='phone'>phone</label>
          <input
            type='number'
            id='phone'
            value={phone}
            name='phone'
            onChange={handleChange}
            required
          />
        </div>
        <div className='input-group'>
          <label htmlFor='role'>role</label>
          <select name="role" id="role" value={role} onChange={handleChange}>
            <option value="Company">Company</option>
            <option value="Volunteer">Volunteer</option>
          </select>
        </div>
        <div className='input-group'>
          <label htmlFor='password'>password</label>
          <input
            type='password'
            id='password'
            value={password}
            name='password'
            onChange={handleChange}
            required
          />
        </div>
        <div className='input-group'>
          <label htmlFor='confirm'>confirm password</label>
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
        <p className='signup-link'>Already have an account?  <Link to='/SignInForm' >Sign in</Link></p>
      </form>
    </main>
    </div>
    </div>
  );
};

export default SignUpForm