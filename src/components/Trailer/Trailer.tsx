import './Trailer.scss';

import { FC, useState } from 'react';
import ReactPlayer from 'react-player';
import Icon from '../Icon';
import Loader from '../Loader';

interface ITrailerProps {
  title: string;
  trailerUrl: string;
}

const Trailer: FC<ITrailerProps> = ({ title, trailerUrl }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handlePlay = (): void => {
    setIsPlaying((prev: boolean): boolean => !prev);
  };

  return (
    <div className='trailer'>
      <div
        className={`trailer__placeholder ${
          !isLoaded ? 'trailer__placeholder_loading' : ''
        } ${!isPlaying ? 'trailer__placeholder_pause' : ''}`}
        onClick={handlePlay}
      >
        {isLoaded && (
          <>
            <button className='btn-reset trailer__btn'>
              <Icon
                name={isPlaying ? 'pause' : 'play'}
                className='trailer__icon'
              />
            </button>
            <div className='trailer__title'>{title}</div>
          </>
        )}

        {!isLoaded && <Loader type='spinner' />}
      </div>

      <ReactPlayer
        url={trailerUrl}
        playing={isPlaying}
        controls={false}
        loop
        width='100%'
        height='100%'
        onReady={(): void => setIsLoaded(true)}
        config={{
          youtube: {
            playerVars: {
              autoplay: 1, // Автоматически воспроизводить видео
              controls: 0, // Убрать встроенные элементы управления
              modestbranding: 1, // Скрыть логотип YouTube
              rel: 0, // Не показывать похожие видео в конце
              showinfo: 0, // Не показывать информацию о видео
              fs: 0, // Отключить кнопку полноэкранного режима
              iv_load_policy: 3, // Отключить аннотации
              disablekb: 1, // Отключить клавиатуру
              cc_load_policy: 0, // Отключить субтитры
              start: 0, // Воспроизведение с начала
              playsinline: 1, // Воспроизводить встраиваемо, не открывать полноэкранный режим
            },
          },
        }}
      />
    </div>
  );
};

export default Trailer;
