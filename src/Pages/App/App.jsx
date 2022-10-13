import Footer from '../../components/Footer';
import { Navigate, Route, Routes } from 'react-router-dom';
import Main from '../Main';
import Movies from '../Movies';
import SavedMovies from '../SavedMovies';
import Profile from '../../components/Profile';
import Login from '../Login';
import Register from '../Register';
import Header from '../../components/Header';

const App = () => {
  const isLoggedIn = false;
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/movies' element={<Movies />} />
      <Route path='/saved-movies' element={<SavedMovies />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/signin' element={isLoggedIn ? <Navigate to='/' replace /> : <Login />} />
      <Route path='/signup' element={isLoggedIn ? <Navigate to='/' replace /> : <Register />} />
    </Routes>
  );
};

export default App;
