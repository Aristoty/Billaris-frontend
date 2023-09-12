import React from 'react';

import App2 from './utilities/ShellStructure';
import { SSRProvider } from 'react-bootstrap';





function App() {


  return ( 
    <SSRProvider>
      <App2/>
    </SSRProvider>     
     
  );
}

export default App;
