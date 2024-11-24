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
import BASE_PATH from '../../API/_basePath';

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
        <Link to={`${BASE_PATH}/home`}>
          <Icon className='header__logo' name='logo'></Icon>
        </Link>
        <nav className='header__nav'>
          {isDesktop && (
            <Menu
              link={`${BASE_PATH}/home`}
              isActive={activeLink.includes(`${BASE_PATH}/home`)}
              onClick={() => handleLinkClick(`${BASE_PATH}/home`)}
            >
              Главная
            </Menu>
          )}
          <Menu
            link={`${BASE_PATH}/genres`}
            isActive={activeLink.includes(`${BASE_PATH}/genres`)}
            onClick={() => handleLinkClick(`${BASE_PATH}/genres`)}
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
                isActive={activeLink.includes(`${BASE_PATH}/account`)}
                onClick={() =>
                  handleLinkClick(`${BASE_PATH}/account/favorites`)
                }
              >
                <Icon name='user' className='header__icon' />
              </Menu>
            ) : (
              <Menu
                link='/account/favorites'
                isActive={activeLink.includes(`${BASE_PATH}/account`)}
                onClick={() => handleLinkClick(`${BASE_PATH}/account/favorites`)}
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
