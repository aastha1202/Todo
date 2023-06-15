import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Preview from './component/Preview';
import User from './component/User';
import Create from './component/Create';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element=<Preview/>></Route> 
        <Route path="/User" element=<User/>></Route> 
        <Route path='/Create' element=<Create/>/>
      </Routes>
    </BrowserRouter>
      {/* <Create/> */}
    </div>
  );
}

export default App;
