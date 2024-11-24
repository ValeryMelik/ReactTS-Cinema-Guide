export default function formatGenreName(genreKey: string): string {
  const genreMap: Record<string, string> = {
    history: 'Исторический',
    horror: 'Ужасы',
    scifi: 'Фантастика',
    'stand-up': 'Стендап',
    fantasy: 'Фэнтези',
    drama: 'Драма',
    mystery: 'Мистика',
    family: 'Семейный',
    comedy: 'Комедия',
    romance: 'Романтика',
    music: 'Музыка',
    crime: 'Криминал',
    'tv-movie': 'ТВ-фильм',
    documentary: 'Документальный',
    action: 'Боевик',
    thriller: 'Триллер',
    western: 'Вестерн',
    animation: 'Мультфильм',
    war: 'Военный',
    adventure: 'Приключения',
  };

  return genreMap[genreKey] || 'Неизвестный жанр';
}
