
import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<News key={"general"} pageSize={12} country="in" category="general"/>}/>
        <Route exact path='/business' element={<News key={"business"} pageSize={12} country="in" category="business"/>}/>
        <Route exact path='/health' element={<News key={"health"} pageSize={12} country="in" category="health"/>}/>
        <Route exact path='/entertainment' element={<News key={"entertainment"} pageSize={12} country="in" category="entertainment"/>}/>
        <Route exact path='/technology' element={<News key={"technology"} pageSize={12} country="in" category="technology"/>}/>
        <Route exact path='/science' element={<News key={"science"} pageSize={12} country="in" category="science"/>}/>
        <Route exact path='/sports' element={<News key={"sports"} pageSize={12} country="in" category="sports"/>}/>
      </Routes>
      </>
    )
  }
}


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a  
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
