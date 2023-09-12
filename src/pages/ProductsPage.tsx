import React from 'react';
import Messages from '../components/Messages';

interface ContentState{
    data : any[]
}

export default class ProductContent extends React.Component<{}, ContentState>{

   


    render(){

        return(
          <div className='container mb-4 mt-2'>
            <div className='text-center'>
            <div className='card'>
          <div className='card-body'>
            <h5 className='card-title'>Backend response:</h5>
            <Messages />
            </div>
          </div>
          </div>
          </div>
            
        )
    }
}