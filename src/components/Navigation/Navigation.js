import React from 'react';

const Navigation = ({onRouteChange,isSignedIn}) => {

	
      if(isSignedIn) {
      	return (
      <nav style={{display:'flex' ,justifyContent:'flex-end'}}>
        <p onClick={() => onRouteChange('signout')} className='fw3 dim underline b black link pointer pa3'>Sign Out</p>
      </nav>
      );
     } else {
     	return (
          <nav style={{display:'flex' ,justifyContent:'flex-end'}}>
           <p onClick={() => onRouteChange('signin')} className='fw3 dim underline b black link pointer pa3'>Sign In</p>
           <p onClick={() => onRouteChange('register')} className='fw3 dim underline b black link pointer pa3'>Register</p>
          </nav>
     		);
     }
} 

export default Navigation;
