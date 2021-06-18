import { USER_AUTHENTICATED, POST_RESPONSE, IS_AUTHENTICATED, ACCOUNT_UPDATED, ACTIVE_NAV, EMAIL_IN_USE, PHOTO_UPDATED, EMAIL_UPDATED, 
    PASSWORD_UPDATED, LOGIN_FAILED, PASSWORD_RESET, PAGE_NUMBER, FORM_DATA_DISPLAY, SUBMIT_POST_SUCCESS, SUBMIT_POST_LOADING, 
    SUBMIT_POST_FAILURE,INCLUDE_VOLUME_CHART, REPLY, REPLY_FAILURE, REPLY_LOADING, REPLY_SUCCESS, FETCH_POST_SUCCESS, PASSWORD_RESET_LOADING, PASSWORD_RESET_FAILURE,
    PASSWORD_RESET_SUCCESS, SHOW_COMMENTS, CONTACT_FAILURE, CONTACT_SUCCESS, CONTACT_LOADING, FETCH_POST_LOADING, FETCH_POST_FAILURE,
    DISABLE_NEXT } from './usersTypes'
  import axios from 'axios'
  import _ from 'lodash'
  import setAuthorizationToken from '../../utils/setAuthorizationToken'
  import jwt from 'jsonwebtoken'
  
  //const jwt = require('jsonwebtoken');

  export const addUserAuthenticated = (index = 0) => {
      return {
        type: USER_AUTHENTICATED,
        payload: index
      }
    }
  export const addPostResponse = (index = 0) => {
      return {
        type: POST_RESPONSE,
        payload: index
      }
    }
  export const addIsAuthenticated = (index = false) => {
      return {
        type: IS_AUTHENTICATED,
        payload: index
      }
    }
  export const addActiveNav = (index = '') => {
      return {
        type: ACTIVE_NAV,
        payload: index
      }
    }
  export const addEmailInUse = (index = false) => {
      return {
        type: EMAIL_IN_USE,
        payload: index
      }
    }
  export const addPhotoUpdated = (index = false) => {
      return {
        type: PHOTO_UPDATED,
        payload: index
      }
    }
  export const addEmailUpdated = (index = false) => {
      return {
        type: EMAIL_UPDATED,
        payload: index
      }
    }
  export const addPasswordUpdated = (index = false) => {
      return {
        type: PASSWORD_UPDATED,
        payload: index
      }
    }
  export const addLoginFailed = (index = false) => {
      return {
        type: LOGIN_FAILED,
        payload: index
      }
    }
  export const addPasswordReset = (index = false) => {
      return {
        type: PASSWORD_RESET,
        payload: index
      }
    }
    export const addPageNumber = (index = 1) => {
      return {
        type: PAGE_NUMBER,
        payload: index
      }
    }
    export const addSubmitPostLoading = index  => {
      return {
        type: SUBMIT_POST_LOADING,
        payload: index
      }
    }
    export const addSubmitPostSuccess = index  => {
      return {
        type: SUBMIT_POST_SUCCESS,
        payload: index
      }
    }
    export const addSubmitPostFailure = index  => {
      return {
        type: SUBMIT_POST_FAILURE,
        payload: index
      }
    }
    export const addFormDataDisplay = (index = 1) => {
      return {
        type: FORM_DATA_DISPLAY,
        payload: index
      }
    }
    export const addIncludeVolumeChart = (index = true) => {
      return {
        type: INCLUDE_VOLUME_CHART,
        payload: index
      }
    }
    export const addReply = (index ) => {
      return {
        type: REPLY,
        payload: index
      }
    }
    export const addReplyLoading = (index = false ) => {
      return {
        type: REPLY_LOADING,
        payload: index
      }
    }
    export const addReplySuccess = (index = false ) => {
      return {
        type: REPLY_SUCCESS,
        payload: index
      }
    }
    export const addReplyFailure = (index = false ) => {
      return {
        type: REPLY_FAILURE,
        payload: index
      }
    }
    export const addFetchPostSuccess = (index = false ) => {
      return {
        type: FETCH_POST_SUCCESS,
        payload: index
      }
    }
    export const addFetchPostLoading = (index = false ) => {
      return {
        type: FETCH_POST_LOADING,
        payload: index
      }
    }
    export const addFetchPostFailure = (index = false ) => {
      return {
        type: FETCH_POST_FAILURE,
        payload: index
      }
    }
    export const addPasswordResetSuccess = (index = false ) => {
      return {
        type: PASSWORD_RESET_SUCCESS,
        payload: index
      }
    }
    export const addPasswordResetLoading = (index = false ) => {
      return {
        type: PASSWORD_RESET_LOADING,
        payload: index
      }
    }
    export const addPasswordResetFailure = (index = false ) => {
      return {
        type: PASSWORD_RESET_FAILURE,
        payload: index
      }
    }
    export const addContactSuccess = (index = false ) => {
      return {
        type: CONTACT_SUCCESS,
        payload: index
      }
    }
    export const addContactLoading = (index = false ) => {
      return {
        type: CONTACT_LOADING,
        payload: index
      }
    }
    export const addContactFailure = (index = false ) => {
      return {
        type: CONTACT_FAILURE,
        payload: index
      }
    }
    export const addShowComments = (index = false ) => {
      return {
        type: SHOW_COMMENTS,
        payload: index
      }
    }
    export const addDisableNext = (index = false ) => {
      return {
        type: DISABLE_NEXT,
        payload: index
      }
    }
    export function fetchPosts(data) {
      return function (dispatch) {
          axios({
            method: 'get',
            url: "/posts/"+data,
          }).then(res => {
              const response = res.data;
              dispatch(addFormDataDisplay(response))
              dispatch(addFetchPostSuccess(true))
          })
      }
  }
  export function createNewReply(data) {
    return function (dispatch) {
        dispatch(addReplyLoading(true))
        axios.post('/post/reply/',data).then(res => {
            const response = res.data;
            if (response['type'] == 'success'){
              dispatch(addReplySuccess(true))
            } else {
              dispatch(addReplyFailure(true))
            }
            dispatch(addReplyLoading(false))      
        })
    }
  }
  export function createNewPost(data) {
      
      return function (dispatch) {
          dispatch(addSubmitPostLoading(true))
          axios.post('/post/new/',data).then(res => {
              const response = res.data;
              if (response['type'] == 'success'){
                dispatch(addSubmitPostSuccess(true))
              } else {
                dispatch(addSubmitPostFailure(true))
              }
              dispatch(addSubmitPostLoading(false))
              //dispatch(addPostResponse(response))
              
          })
      }
  }
  
  export function fetchUserAuth(data) {
      return function (dispatch)  {
  
          axios.post('/api/users/auth/',data).then(res => {
              const token = res.data;
              localStorage.setItem('jwtToken',token)
              setAuthorizationToken(token)
              dispatch(addUserAuthenticated(jwt.decode(token)))
              {jwt.decode(token)['isAuthenticated'] ? dispatch(addIsAuthenticated(true)) : dispatch(addIsAuthenticated(false))}
          })
      }
  }
  export function fetchLogin(data) {
    return function (dispatch)  {
        // fetch('/api/users/auth/').then( response => response.json()).then( data => {
        //     console.log(data)
        //     dispatch(addLoginFailed(true))
        // })
        axios.post('/api/users/login',data).then(res => {
            console.log(res)
            console.log(res.data)
            const token = res.data;
            const checkAuth = jwt.decode(token)
            if (!checkAuth['isAuthenticated']) {
              dispatch(addLoginFailed(true))
            } else {
              localStorage.setItem('jwtToken',token)
              setAuthorizationToken(token)
              dispatch(addUserAuthenticated(jwt.decode(token)))
              {jwt.decode(token)['isAuthenticated'] ? dispatch(addIsAuthenticated(true)) : dispatch(addIsAuthenticated(false))}
            }
        
        
        })
    

    }
  }
  export function fetchRegister(data) {
    return function (dispatch)  {
        
        axios.post('/users/register/',data).then(res => {
            const response = jwt.decode(res.data);
            if (response['emailAlreadyUsed']) {
              dispatch(addEmailInUse(true))
            }
            if (!response['emailAlreadyUsed'] && response['registerSuccess']){
              dispatch(addEmailInUse(false))
              localStorage.setItem('jwtToken',res.data)
              setAuthorizationToken(res.data)
              dispatch(addUserAuthenticated(response['user']))
              dispatch(addIsAuthenticated(true))
              
            }
        })
    }
  }
  export function fetchUpdatePhoto(data) {
    return function (dispatch)  {
        axios.post('/users/updatePhoto/',data,{ headers: { 'content-type': 'multipart/form-data' } }).then(res => {
          const token = res.data;
          localStorage.setItem('jwtToken',token)
          setAuthorizationToken(token)
          dispatch(addUserAuthenticated(jwt.decode(token)))
          {jwt.decode(token)['isAuthenticated'] ? dispatch(addIsAuthenticated(true)) : dispatch(addIsAuthenticated(false))}
          dispatch(addPhotoUpdated(true))
        })
    }
  }
  
  export function fetchUpdateAccount(data) {
    return function (dispatch)  {
        axios.post('/users/updateAccount/',data).then(res => {
          const token = res.data;
          if (jwt.decode(token)['updateEmail']) {
            dispatch(addEmailUpdated(true))
          }
          if (jwt.decode(token)['updatePassword']) {
            dispatch(addPasswordUpdated(true))
          }
          localStorage.setItem('jwtToken',token)
          setAuthorizationToken(token)
          dispatch(addUserAuthenticated(jwt.decode(token)))
          {jwt.decode(token)['isAuthenticated'] ? dispatch(addIsAuthenticated(true)) : dispatch(addIsAuthenticated(false))}
        })
    }
  }
  export function fetchPasswordReset(data) {
    return function (dispatch)  {
        dispatch(addPasswordResetLoading(true))
        axios.post('/users/reset_password/',data).then(res => {
          const response = res.data
          if (response == 'success') {
            dispatch(addPasswordReset(true))
            dispatch(addPasswordResetSuccess(true))
            dispatch(addPasswordResetLoading(false))
          } else {
            dispatch(addPasswordReset(false))
            dispatch(addPasswordResetFailure(true))
            dispatch(addPasswordResetLoading(false))
          }
        })
    }
  }
  export function fetchContact(data) {
    var exportMessage = {'message': data}
    return function (dispatch)  {
        dispatch(addContactLoading(true))
        axios.post('/users/send_contact_email/',exportMessage).then(res => {
          const response = res.data
          if (response == 'success') {
            dispatch(addContactSuccess(true))
            dispatch(addContactLoading(false))
          } else {
            dispatch(addContactFailure(true))
            dispatch(addContactLoading(false))
          }
        })
    }
  }
  export function fetchAccount(data) {
    return function (dispatch)  {
        axios.post('/users/account/',data).then(res => {
            const token = res.data;
  
            localStorage.setItem('jwtToken',token)
            setAuthorizationToken(token)
            dispatch(addUserAuthenticated(jwt.decode(token)))
            {jwt.decode(token)['isAuthenticated'] ? dispatch(addIsAuthenticated(true)) : dispatch(addIsAuthenticated(false))}
        })
    }
  }
  
  export function fetchLogout(data) {
    return function (dispatch)  {
  
        axios.post('/users/logout/',data).then(res => {
            const token = res.data;
            dispatch(addUserAuthenticated(jwt.decode(token)))
            dispatch(addIsAuthenticated(false))
            
        })
    }
  }