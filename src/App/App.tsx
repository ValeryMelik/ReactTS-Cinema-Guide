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
        <Route path='/' element={<Navigate to='/home' replace />} />
        <Route path='/home' element={<Home />} />
        <Route path='/home/:movie' element={<Movie />} />
        <Route path='/genres' element={<Genres />} />
        <Route path='/genres/:genre' element={<GenreMoviesList />} />
        <Route path='/genres/:genre/:movie' element={<Movie />} />
        <Route
          path='/account'
          element={<Navigate to='/account/favorites' replace />}
        />

        <Route path='/account/:section' element={renderAccount()} />

        <Route path='/not-found' element={<NotFound />} />
        <Route path='*' element={<Navigate to='/not-found' replace />} />
      </Routes>
      <Snackbar />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
