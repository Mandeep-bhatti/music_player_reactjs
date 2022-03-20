import React from 'react';
import { Provider } from "react-redux"
import Store from './redux/store';
import Music from './components/musics/Music'
function App() {

  return (
    <Provider store={Store}>
      {/* <h1>hello</h1> */}
      <Music />
    </Provider>

  );
}

export default App;
