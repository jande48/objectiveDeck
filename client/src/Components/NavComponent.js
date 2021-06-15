import React, {useState} from 'react'
import { Provider,connect } from 'react-redux'
import {Link} from 'react-router-dom'
import '../App.css'
import store from '../redux/store'
// import { Menu} from "semantic-ui-react"
import { addActiveNav } from '../redux'

function NavComponent (props) {
  function handleItemClick (data){ 
    props.addActiveNav(data)
}

  return (
    <div>
      
      {props.isAuthenticated ? 
      <div className="flexContainer">
        <div className="flexside">
          <Link to="/">
          <h3>
          <a 
          href="#"
          name='home'
          active={props.activeNav === 'home'}
          onClick={(e,data) => handleItemClick('home')}
          >
          Objective Deck
          </a>
          </h3>
          </Link>
        </div>
        <div className="flexmiddle"></div>
        <div className="flexsideHeader">   
          <Link to="/account">
          <h3
          name='account'
          active={props.activeNav === 'account'}
          onClick={(e,data) => handleItemClick('account')}
          >
          Account
          </h3>
          </Link>
        </div>
        <div className="flexsideHeader">   
          <Link to="/logout">
          <h3
          name='logout'
          active={props.activeNav === 'logout'}
          onClick={(e,data) => handleItemClick('logout')}
          >
          Logout
          </h3>
          </Link>
        </div>
      </div>
      :
      <div className="flexContainer">
        <div className="flexside">
        <Link to="/">
        <h3
          name='home'
          active={props.activeNav === 'home'}
          onClick={(e,data) => handleItemClick('home')}
          >
          Objective Deck
          </h3>
        </Link>
        </div>
        <div className="flexmiddle"></div>
        <div className="flexsideHeader">  
          
          <h5>
          <a 
          href="#"
          name='login'
          active={props.activeNav === 'login'}
          onClick={(e,data) => handleItemClick('login')}
          >
          Login
          </a>
          </h5>

        </div>
        <div className="flexsideHeader"> 
          <Link to="/register">
          <h5
          name='register'
          active={props.activeNav === 'register'}
          onClick={(e,data) => handleItemClick('register')}
          >
          Sign Up
          </h5>
          </Link>
        </div>
        </div>
          }
    </div>
  )
}
const mapStateToProps = state => {
    return {
      isAuthenticated: state.usersFromRootReducer.isAuthenticated,
      activeNav: state.usersFromRootReducer.activeNav,
    }
  }
  
const mapDispatchToProps = dispatch => {
return {
    addActiveNav: (x) => dispatch(addActiveNav(x)),
    
}
}
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(NavComponent)