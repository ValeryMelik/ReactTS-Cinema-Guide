import './Menu.scss';

import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface MenuProps {
  link: string;
  children: ReactNode;
  className?: string;
  isActive: boolean;
  onClick: () => void;
}

const Menu: FC<MenuProps> = ({
  link,
  children,
  isActive,
  className,
  onClick,
}) => {
  const combinedClassName = `link-reset menu ${className ?? ''} ${
    isActive ? 'menu_active' : ''
  }`.trim();

  return (
    <Link to={link} className={combinedClassName} onClick={onClick}>
      {children}
    </Link>
  );
};

export default Menu;
