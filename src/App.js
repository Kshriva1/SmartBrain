import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';


const particleOptions = {
"particles": {
    "number": {
      "value": 100
    },
    "shape": {
      "type": "circle"
    },
    "size": {
      "value": 10,
      "random": true
    },
    "line_linked": {
      "enable": false
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "bottom",
      "straight": false
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false
      }
    },
    "modes": {
      "push": {
        "particles_nb": 12
      }
    }
  }
}

const initialState = {
    input: '',
    imageUrl: '',
    box:{},
    route:'signin',
    isSignedIn: false,
    user : {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
  }

class App extends Component {
 constructor() {
  super();
  this.state=initialState;
 }

 loadUser = (data) => {

  this.setState({
    user : {
      name : data.name,
      id: data.id,
      email : data.email,
      entries : data.entries,
      joined : data.joined
    }
  })
 }


 calculateFaceLocation = (data) => {
   const clarifaiFace =  data.outputs[0].data.regions[0].region_info.bounding_box;
   const image = document.getElementById('inputimage');
   const width = image.width;
   const height = image.height;
   return {
    leftCol : clarifaiFace.left_col * width,
    topRow : clarifaiFace.top_row * height,
    rightCol : width - (clarifaiFace.right_col * width),
    bottomRow : height - (clarifaiFace.bottom_row * height)
   }
 }

 detectFace = (box) => {
   this.setState({box:box});
   
 }

 onInputChange = (event) => {
  this.setState({input:event.target.value});
 }


 onButtonSubmit =() => {
  this.setState({imageUrl:this.state.input});
  fetch('http://localhost:3001/imageUrl', {
      method: 'post',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
  .then(response => response.json())
  .then(response => {
    if(response) {
      fetch('http://localhost:3001/image', {
      method: 'put',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        id: this.state.user.id
      })
    })

      .then(response => response.json())
      .then(count => {
        this.setState(Object.assign(this.state.user,{entries:count}))
      })
      .catch(console.log);
    }
   this.detectFace(this.calculateFaceLocation(response))})
  .catch(err => console.log(err));
 }


 onRouteChange = (route) => {

    if(route==='signout') {
      this.setState(initialState);
    } else if(route==='home') {
      this.setState({isSignedIn:true});
    } 
    this.setState({ route:route })
 }



  render() {
    return (
      <div className="App">  
            <Particles className='particles'
                params={particleOptions} /> 
       <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
        { this.state.route==='home' ?
     <div>
       <Logo />
       <Rank name={this.state.user.name} entries={this.state.user.entries} />
       <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
       <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
     </div> :

      ( this.state.route==='signin' ?
       <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} /> :
       <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
       )}
      </div>
    );
  }
}

export default App;
