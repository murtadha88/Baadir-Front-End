import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { signUp } from '../../services/authService'

import { UserContext } from '../../contexts/UserContext'

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
    <main>
      <h1>Sign Up</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>name:</label>
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
          <label htmlFor='email'>Email:</label>
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
          <label htmlFor='phone'>Phone:</label>
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
          <label htmlFor='role'>Role:</label>
          <select name="role" id="role" value={role} onChange={handleChange}>
            <option value="Company">Company</option>
            <option value="Volunteer">Volunteer</option>
          </select>
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
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
          <label htmlFor='confirm'>Confirm Password:</label>
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
          <button onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </main>
  );
};

export default SignUpForm