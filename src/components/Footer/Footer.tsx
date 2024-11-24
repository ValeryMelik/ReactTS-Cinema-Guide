import './Footer.scss';

import Icon from '../Icon';

import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className='footer'>
      <div className='footer__container container'>
        <small className='footer__capture'>
          <span className='footer__llc'>LLC «Мультимедиа Визион»</span>
          <span className='footer__cr'>&#169;</span>
          <span className='footer__pr'>Все права защищены</span>
        </small>
        <div className='footer__link-list'>
          <a href='https://vk.com/' className='link-reset footer__link'>
            <Icon name='vk' className='footer__svg' />
          </a>
          <a href='https://www.youtube-nocookie.com' className='link-reset footer__link'>
            <Icon name='yt' className='footer__svg' />
          </a>
          <a href='https://ok.ru/' className='link-reset footer__link'>
            <Icon name='ok' className='footer__svg' />
          </a>
          <a href='https://t.me/' className='link-reset footer__link'>
            <Icon name='tg' className='footer__svg' />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
