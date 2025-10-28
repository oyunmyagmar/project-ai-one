export type MovieType = {
  id: number;
  genre_ids: number[];
  title: string;
};

export type MovieResponseType = {
  page: number;
  results: MovieType[];
  total_pages: number;
  total_results: number;
};
