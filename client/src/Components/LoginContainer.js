import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { fetchLogin, addActiveNav } from '../redux'
import { Redirect, Link } from "react-router-dom";
import '../App.css'

function LoginContainer (props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [showEmailWarning, setShowEmailWarning] = useState(false)
    const handleEmailChange = (e, data) => setEmail(e.target.value)
    const handlePasswordChange = (e, data) => setPassword(e.target.value)
    const handleRememberMeChange = (e, data) => setRememberMe(!rememberMe) 
    const [modalOpenArray, setModalOpenArray] = useState({'activated':'none'})
    Modal.setAppElement('#root');

    useEffect(() => {
      checkEmail()
      props.addActiveNav('login')
    },[email])



    function checkEmail() {
        if ((email.length > 3 && !email.includes('@')) || (email.length > 3 && !email.includes('.'))) {
            setShowEmailWarning(true)
        }else{
            setShowEmailWarning(false)
        }
    }

    function handleSubmit() {

        const payload = {
            'email': email,
            'password': password,
            'rememberMe': rememberMe,
            }
        props.fetchLogin(payload)
    }
    var w = window.innerWidth;
return (

<div>
  { props.isAuthenticated ? <Redirect to="/" /> : ''}
  {w > 700 ?
  <div className="flexContainer">
    <div className="flexsideLogin"></div>
    <div className="flexmiddleLogin">
    <form>
      <div className="form-group">
        <label for="Email">Email Address: </label>
        <input type="email" className="form-control" id="Email" aria-describedby="emailHelp" placeholder="Enter Email" onChange={handleEmailChange}/>
        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div className="form-group">
        <label for="Password">Password: </label>
        <input type="password" className="form-control" id="Password" placeholder="Password" onChange={handlePasswordChange}/>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="CheckRemember"/>
        <label className="form-check-label" for="CheckRemember" onChange={handleRememberMeChange}>Remember Me</label>
      </div>
      
    </form>
    <button className="btn btn-primary btn-lg" onClick={handleSubmit}>Login</button>
    { props.loginFailed ? 
       <h3>Incorrect email or password. </h3>
     : ''}
    </div>
    <div className="flexsideLogin"></div>
  </div>
//   <Grid columns='equal'>
//     <Grid.Column></Grid.Column>
//     <Grid.Column width={8} className='lightGrayBackground'>
//     <Message
//       attached
//       color='green'
//       header='Welcome'
//       content='Please enter your email and password to login:'
//     /><br/>
//     <Form inverted onSubmit={handleSubmit}>
//       { showEmailWarning ? 
//       <Message negative>
//         <Message.Header>That doesn't seem like a vaild email.</Message.Header>
//       </Message> : ''}
//       <Form.Field
//         id='form-input-control-email'
//         control={Input}
//         label='Email'
//         placeholder='joe@schmoe.com'
//         onChange={handleEmailChange}
//       />
//       <Form.Input 
//         label='Password' 
//         type='password'
//         value={password}
//         onChange={handlePasswordChange} />
//       <Form.Field>
//       <Checkbox label='Remember me' onChange={handleRememberMeChange}/>
//       </Form.Field>
//       <Link to="/resetPassword"><a href="#">Reset Password</a></Link>
//       <Form.Button inverted color='green' floated='right' content='Login' />
//       <Divider hidden/>
//       <Divider hidden/>
//       { props.loginFailed ? 
//       <Message negative>
//         <Message.Header>Incorrect email or password. Would you like to <Link to="/resetPassword"><a href="#">Reset Password?</a></Link></Message.Header>
//       </Message> : ''}
//       <br/>
      

//     </Form><br/>
//     </Grid.Column>
//     <Grid.Column></Grid.Column>
//   </Grid>
  : 
  <div class="fullWidth">
      <h1>Hello small screen</h1>
   {/* <Grid columns='equal'>
    <Grid.Column width={1}></Grid.Column>
    <Grid.Column className='lightGrayBackground'>
    <Message
      attached
      color='green'
      header='Welcome'
      content='Please enter your email and password to login:'
    /><br/>
    <Form inverted onSubmit={handleSubmit}>
      { showEmailWarning ? 
      <Message negative>
        <Message.Header>That doesn't seem like a vaild email.</Message.Header>
      </Message> : ''}
      <Form.Field
        id='form-input-control-email'
        control={Input}
        label='Email'
        placeholder='joe@schmoe.com'
        onChange={handleEmailChange}
      />
      <Form.Input 
        label='Password' 
        type='password'
        value={password}
        onChange={handlePasswordChange} />
      <Form.Field>
      <Checkbox label='Remember me' onChange={handleRememberMeChange}/>
      </Form.Field>
      <Link to="/resetPassword"><a href="#">Reset Password</a></Link>
      <Form.Button inverted color='green' floated='right' content='Login' />
      { props.loginFailed ? 
      <Message negative>
        <Message.Header>Incorrect email or password. Would you like to <Link to="/resetPassword"><a href="#">Reset Password?</a></Link></Message.Header>
      </Message> : ''}
      <br/>
      

    </Form><br/>
    </Grid.Column>
    <Grid.Column width={1}></Grid.Column>
  </Grid>  */}
  </div>}
</div>

)
}

const mapStateToProps = state => {
    return {
      isAuthenticated: state.usersFromRootReducer.isAuthenticated,
      loginFailed: state.usersFromRootReducer.loginFailed,
      

    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      fetchLogin: (x) => dispatch(fetchLogin(x)),
      addActiveNav: (x) => dispatch(addActiveNav(x))
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginContainer)