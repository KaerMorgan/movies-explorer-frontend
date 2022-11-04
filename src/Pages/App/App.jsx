import { useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Route, Routes } from 'react-router-dom';
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
  const [userInfo, setUserInfo] = useState({});

  const onUserInfoChange = (values) => {
    setUserInfo(values);
  };

  const onLogin = async () => {
    const user = await getUserInfo();
    setUserInfo(user);
  };

  useEffect(() => {
    onLogin();
  }, []);

  return (
    <UserContext.Provider value={userInfo}>
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
        <Route path='/signin' element={<Login onLogin={onLogin} />} />
        <Route path='/signup' element={<Register />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
