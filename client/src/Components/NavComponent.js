import React, {useState} from 'react'
import { Provider,connect } from 'react-redux'
import {Link} from 'react-router-dom'
import '../App.css'
import store from '../redux/store'
// import { Menu} from "semantic-ui-react"
import { addActiveNav } from '../redux'

function NavComponent (props) {
  function handleItemClick (data){ 
    props.addActiveNav(data.name)
}

  return (
        <div>
            <Link to="/">
            <h3
            name='home'
            active={props.activeNav === 'home'}
            onClick={(e,data) => handleItemClick(data)}
            >
            Home
            </h3>
            </Link>
            <Link to="/charts">
            <h3
            name='charts'
            active={props.activeNav === 'charts'}
            onClick={(e,data) => handleItemClick(data)}
            >
            Charts
            </h3>
            </Link>
            <Link to="/posts">
            <h3
            name='forum'
            active={props.activeNav === 'forum'}
            onClick={(e,data) => handleItemClick(data)}
            >
            Posts
            </h3>
            </Link>
        {props.isAuthenticated ? 
         <div>   
            <Link to="/account">
            <h3
            name='account'
            active={props.activeNav === 'account'}
            onClick={(e,data) => handleItemClick(data)}
            >
            Account
            </h3>
            </Link>
            <Link to="/logout">
            <h3
            name='logout'
            active={props.activeNav === 'logout'}
            onClick={(e,data) => handleItemClick(data)}
            >
            Logout
            </h3>
            </Link>
       </div>
        :
         <div>  
            <Link to="/login">
            <h3
            name='login'
            active={props.activeNav === 'login'}
            onClick={(e,data) => handleItemClick(data)}
            >
            Login
            </h3>
            </Link>
            <Link to="/register">
            <h3
            name='register'
            active={props.activeNav === 'register'}
            onClick={(e,data) => handleItemClick(data)}
            >
            Sign Up
            </h3>
            </Link>
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