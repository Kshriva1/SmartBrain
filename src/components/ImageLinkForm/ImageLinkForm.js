import React from 'react';
import './ImageLinkForm.css'


const ImageLinkForm = ({ onInputChange,onButtonSubmit }) => {

   return(

    <div>
   <p className='f3'>
   {'This magic brain will detect faces on your pictures. Give it a try!'}
    </p>

    <div className='shadow-5 br3 pa4 form center' style={{display:'flex',justifyContent:'center'}}>
      <input className='f4 pa2 w-70 center pv2' input='text' onChange={onInputChange} />
      <button className='pa3 f4 w-30 link grow ph3 pv2 white dib bg-green' onClick={onButtonSubmit}>Detect</button>
      </div>
    </div>

   	)
}

export default ImageLinkForm;