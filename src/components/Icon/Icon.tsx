import { FC } from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  className?: string;
}

const Icon: FC<IconProps> = ({ name, className, ...props }) => {
  return (
    <svg className={`svg-reset ${className ?? ''}`} {...props}>
      <use href={`/ReactTS-Cinema-Guide/img/sprite.svg#${name}`} />
    </svg>
  );
};

export default Icon;
