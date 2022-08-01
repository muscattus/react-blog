import logo from './logo.svg';
import './App.css';
import { PostsContainer } from './components/Posts/index';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom'
import { SinglePostContainer } from './components/SinglePost';
import { HeaderContainer } from './components/Header/Header';
import { SignupWindowContainer } from './components/SignupWindow/index';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="main-wrapper">
            <HeaderContainer />
            <Routes>
              <Route path="/" element={<PostsContainer />} />
              <Route path="/post/:id" element={<SinglePostContainer />} />
            </Routes>
        </div>
      </BrowserRouter>
      <SignupWindowContainer />
    </>
  )
}

export default App;
