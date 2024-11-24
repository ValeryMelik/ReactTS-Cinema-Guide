import './Account.scss';

import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Menu from '../../components/Menu/';
import Icon from '../../components/Icon/';
import FavoriteMovies from '../../components/FavoriteMovies';
import Profile from '../../components/Profile';
import useMediaPoints from '../../hooks/useMediaPoints';
import BASE_PATH from '../../API/_basePath';

const Account: FC = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState<string>(location.pathname);

  useEffect((): void => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const handleLinkClick = (link: string): void => {
    setActiveLink(link);
  };

  const { isMobile } = useMediaPoints();

  return (
    <section className='account'>
      <div className='account__container container'>
        <h2 className='title-reset account__title'>Мой аккаунт</h2>
        <nav className='account__nav'>
          <Menu
            link={`${BASE_PATH}/account/favorites`}
            isActive={activeLink.includes(`${BASE_PATH}/account/favorites`)}
            onClick={() => handleLinkClick(`${BASE_PATH}/account/favorites`)}
          >
            <Icon name='like' className='account__svg' />
            <span className='account__capture'>
              {!isMobile ? `Избранные фильмы` : `Избранные`}
            </span>
          </Menu>
          <Menu
            link={`${BASE_PATH}/account/settings`}
            isActive={activeLink.includes(`${BASE_PATH}/account/settings`)}
            onClick={() => handleLinkClick(`${BASE_PATH}/account/settings`)}
          >
            <Icon name='user' className='account__svg' />
            <span className='account__capture'>
              {!isMobile ? `Настройка аккаунта` : `Настройки`}
            </span>
          </Menu>
        </nav>

        {activeLink.includes(`${BASE_PATH}/account/favorites`) && (
          <FavoriteMovies />
        )}
        {activeLink.includes(`${BASE_PATH}/account/settings`) && <Profile />}
      </div>
    </section>
  );
};

export default Account;
