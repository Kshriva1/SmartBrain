import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
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
class App extends Component {
 constructor() {
  super();
  this.state={
    input: ''
  }
 }

 onInputChange = (event) => {
  console.log(event.target.value)
 }

 onButtonSubmit =() => {
  console.log('click');
 }

  render() {
    return (
      <div className="App">  
            <Particles className='particles'
                params={particleOptions} /> 
       <Navigation />
       <Logo />
       <Rank />
       <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />

       {/*<FaceRecognitionForm />
       */}
      </div>
    );
  }
}

export default App;
