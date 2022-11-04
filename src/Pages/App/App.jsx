import { useEffect, useState } from 'react';
import { FilmsContext } from '../../contexts/FilmsContext';
import { UserContext } from '../../contexts/UserContext';
import { Navigate, Route, Routes } from 'react-router-dom';
import { moviesApi } from '../../utils/MoviesApi';
import Main from '../Main';
import Movies from '../Movies';
import SavedMovies from '../SavedMovies';
import Profile from '../../components/Profile';
import Login from '../Login';
import Register from '../Register';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import ProtectedRoute from '../../components/ProtectedRoute';
import { getUserInfo } from '../../utils/MainApi';

const App = () => {
  const isLoggedIn = localStorage.getItem('isLogged');
  const [filmsList, setFilmsList] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  const onUserInfoChange = (values) => {
    setUserInfo(values);
  };

  const onLogin = async () => {
    const user = await getUserInfo();
    setUserInfo(user);
  };

  useEffect(() => {
    (async () => {
      const films = await moviesApi.getMovies();
      setFilmsList(films);
      onLogin();
    })();
  }, []);

  return (
    <UserContext.Provider value={userInfo}>
      <FilmsContext.Provider value={filmsList}>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route
            path='/movies'
            element={
              <ProtectedRoute>
                <Movies />
              </ProtectedRoute>
            }
          />
          <Route
            path='/saved-movies'
            element={
              <ProtectedRoute>
                <SavedMovies />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile onUserInfoChange={onUserInfoChange} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/signin'
            element={isLoggedIn ? <Navigate to='/' replace /> : <Login onLogin={onLogin} />}
          />
          <Route path='/signup' element={isLoggedIn ? <Navigate to='/' replace /> : <Register />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </FilmsContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
