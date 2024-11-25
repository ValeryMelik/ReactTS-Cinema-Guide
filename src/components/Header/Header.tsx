import { FC, useState, useEffect } from 'react';
import './Header.scss';

import Icon from '../Icon/';
import Menu from '../Menu/';
import Search from '../Search/Search';
import { Link, useLocation } from 'react-router-dom';

import useModal from '../../hooks/useModal';
import useAuth from '../../hooks/useAuth';
import Loader from '../Loader';
import useMediaPoints from '../../hooks/useMediaPoints';
import formatLongName from '../../utils/formatLongName';

const Header: FC = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState<string>(location.pathname);

  const { handleAuthModalOpen, handleSearchModalOpen } = useModal();
  const { isUserLoading, userProfile, isAuthorized } = useAuth();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const handleLinkClick = (link: string): void => {
    setActiveLink(link);
  };

  const { isMobile, isTablet, isDesktop } = useMediaPoints();

  return (
    <header className='header'>
      <div className='header__container container'>
        <Link to={'/home'}>
          <Icon className='header__logo' name='logo'></Icon>
        </Link>
        <nav className='header__nav'>
          {isDesktop && (
            <Menu
              link='/home'
              isActive={activeLink.includes('/home')}
              onClick={() => handleLinkClick('/home')}
            >
              Главная
            </Menu>
          )}
          <Menu
            link='/genres'
            isActive={activeLink.includes('/genres')}
            onClick={() => handleLinkClick('/genres')}
          >
            {!isMobile ? (
              'Жанры'
            ) : (
              <Icon name='genres' className='header__icon' />
            )}
          </Menu>
          {isDesktop ? (
            <Search className='header__search' />
          ) : (
            <button
              className='btn-reset header__btn'
              onClick={handleSearchModalOpen}
            >
              <Icon name='search' className='header__icon' />
              {isTablet && <span>Поиск</span>}
            </button>
          )}

          {isUserLoading ? (
            <div className='header__loader'>
              <Loader />
            </div>
          ) : isAuthorized ? (
            isMobile ? (
              <Menu
                link='/account/favorites'
                isActive={activeLink.includes('/account')}
                onClick={() => handleLinkClick('/account/favorites')}
              >
                <Icon name='user' className='header__icon' />
              </Menu>
            ) : (
              <Menu
                link='/account/favorites'
                isActive={activeLink.includes('/account')}
                onClick={() => handleLinkClick('/account/favorites')}
              >
                {formatLongName(userProfile!.name)}
              </Menu>
            )
          ) : isMobile ? (
            <button
              className='btn-reset header__btn'
              onClick={handleAuthModalOpen}
            >
              <Icon name='user' className='header__icon' />
            </button>
          ) : (
            <button
              className='btn-reset header__btn header__enter'
              onClick={handleAuthModalOpen}
            >
              <span>Войти</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
