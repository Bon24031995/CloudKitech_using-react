import React, { useEffect, useState } from 'react'
import './App.css';
import { useNavigate } from 'react-router-dom';

function App() {

  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [preventError, setPreventError] = useState('');
  const navigate = useNavigate();
  const [isVisible, setVisible] = useState(false);
  const [aplha, setAplha] = useState('');
  const [beta, setBeta] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3009/data').then(resp => resp.json()).then(json => { console.log(json); setData(json) });
  })

  const ShowPopup = () => {
    setVisible(true);
  }

  const ClosePopup = () => {
    setVisible(false);
  }

  const PrevEr = () => {
    let isValid = true;
    if (!email && !Password) {
      setPreventError('Kindly put the values of email & password');
      isValid = false;
    } else {
      setPreventError('');
    }
    return isValid;
  }

  const SubmitValue = (e) => {
    e.preventDefault();
    if (PrevEr()) {
      const user = data.find((x) => x.email === email && x.password === Password);
      if (user) {
        alert('Login Succesfull');
        navigate('/Dashboard');
      } else {
        alert('Invalid Email or passwrod');
      }
    }
  }

  const updateData = {
    email: aplha,
    password: beta,
  }

  const SubmitData = () => {
    fetch('http://localhost:3009/data', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateData)
    })
  }


  return (
    <div className='design'>
      <div className='row'>
        <div className='col-lg-6'>
          <img className='ms-4 mt-4 mb-5' src='https://product-assets.faasos.io/eatsure_cms/production/333b405b-13b6-429f-82db-900e9795da54.png' alt='logo' height={'75px'} width={'auto'} />
          <button className='float-end mt-5 btn btn-primary' onClick={ShowPopup}>Sign In</button>
          {
            isVisible && (
              <div className='popUp ms-4' style={{position:"absolute",left:"450px",top:"150px",display: isVisible ? 'block' : 'none' }}>
                <button className='btn btn-primary float-end' onClick={ClosePopup}>Close</button>
                <h3 className='mb-3'>Sign In Page</h3>
                <form onSubmit={SubmitData}>
                  <div className='row'>
                    <div className='col-lg-8'>
                      <input value={aplha} onChange={(e) => { setAplha(e.target.value) }} className='form-control mb-3' placeholder='Enter your email to be Updated' />
                    </div>
                    <div className='col-lg-8'>
                      <input value={beta} onChange={(e) => { setBeta(e.target.value) }} className='form-control' placeholder='Enter your Password to be Updated' />
                      <button className='mt-3 btn btn-primary' type='submit'>Submit</button>
                    </div>
                  </div>
                </form>
              </div>)
          }
          <h3 className='ms-4 mt-3 fw-bold' style={{ fontSize: "2.5rem" }}>Skip boring food and indulge in flavoursome Wraps, Meals and Bowls!</h3>
          <form onSubmit={SubmitValue}>
            <div className='row mt-3'>
              <div className='col-lg-8'>
                <input type='email' value={email} onChange={(e) => { setEmail(e.target.value) }} className='form-control ms-4' placeholder='Enter Your Email' />
                <p className='ms-4 mt-3'>{preventError}</p>
              </div>
              <div className='col-lg-8 mt-3'>
                <input type='password' value={Password} onChange={(e) => { setPassword(e.target.value) }} className='form-control ms-4' placeholder='Enter Your Password' />
                <p className='ms-4 mt-3'>{preventError}</p>
                <button className='ms-4 btn btn-primary mt-3' type='submit'>Log In</button>
              </div>
            </div>
          </form>
        </div>
        <div className='col-lg-6'>
          <div className='background-fassos'></div>
        </div>
      </div>
    </div>
  )
}

export default App