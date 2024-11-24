import './App.scss';
import 'swiper/css';

import React from 'react';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Header from '../components/Header/';
import Modal from '../components/Modal/';
import Footer from '../components/Footer/';

import Home from '../pages/Home/';
import Genres from '../pages/GenresList';
import GenreMoviesList from '../pages/GenreMoviesList';
import Movie from '../pages/MovieInfo';
import Account from '../pages/Account/';

import useModal from '../hooks/useModal';
import useAuth from '../hooks/useAuth';
import NotFound from '../pages/NotFound';
import Snackbar from '../components/Snackbar';
import Loader from '../components/Loader';
import BASE_PATH from '../API/_basePath';

function App(): React.ReactElement {
  const { isModalOpen } = useModal();
  const { userStatus } = useAuth();

  const renderAccount = (): React.ReactElement => {
    switch (userStatus) {
      case 'pending':
        return <Loader size='large' />;
      case 'error':
        return <Navigate to='/home' replace />;
      case 'success':
        return <Account />;
    }
  };

  return (
    <BrowserRouter>
      <Header />
      {isModalOpen && <Modal />}
      <Routes>
        <Route
          path={`${BASE_PATH}/`}
          element={<Navigate to={`${BASE_PATH}/home`} replace />}
        />
        <Route path={`${BASE_PATH}/home`} element={<Home />} />
        <Route path={`${BASE_PATH}/home/:movie`} element={<Movie />} />
        <Route path={`${BASE_PATH}/genres`} element={<Genres />} />
        <Route
          path={`${BASE_PATH}/genres/:genre`}
          element={<GenreMoviesList />}
        />
        <Route path={`${BASE_PATH}/genres/:genre/:movie`} element={<Movie />} />
        <Route
          path={`${BASE_PATH}/account`}
          element={<Navigate to={`${BASE_PATH}/account/favorites`} replace />}
        />

        <Route
          path={`${BASE_PATH}/account/:section`}
          element={renderAccount()}
        />

        <Route path={`${BASE_PATH}/not-found`} element={<NotFound />} />
        <Route
          path='*'
          element={<Navigate to={`${BASE_PATH}/not-found`} replace />}
        />
      </Routes>
      <Snackbar />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
