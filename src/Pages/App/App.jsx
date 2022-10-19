import { Navigate, Route, Routes } from 'react-router-dom';
import Main from '../Main';
import Movies from '../Movies';
import SavedMovies from '../SavedMovies';
import Profile from '../../components/Profile';
import Login from '../Login';
import Register from '../Register';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const App = () => {
  const isLoggedIn = true;
  return (
    <Routes>
      <Route path='/' element={isLoggedIn ? <Main /> : <Navigate to='/signup' replace />} />
      <Route path='/movies' element={isLoggedIn ? <Movies /> : <Navigate to='/signup' replace />} />
      <Route
        path='/saved-movies'
        element={isLoggedIn ? <SavedMovies /> : <Navigate to='/signup' replace />}
      />
      <Route
        path='/profile'
        element={isLoggedIn ? <Profile /> : <Navigate to='/signup' replace />}
      />
      <Route path='/signin' element={isLoggedIn ? <Navigate to='/' replace /> : <Login />} />
      <Route path='/signup' element={isLoggedIn ? <Navigate to='/' replace /> : <Register />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
