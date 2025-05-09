export interface CreditsMovie {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface DetailsMovie {
  adult?: boolean;
  backdrop_path?: string;
  belongs_to_collection?: BelongsToCollection;
  budget: number;
  genres: Genre[];
  homepage?: string;
  id: number;
  imdb_id?: string;
  origin_country: string[];
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  production_companies?: ProductionСompany[];
  production_countries?: ProductionСountry[];
  release_date?: string;
  revenue?: number;
  runtime: number;
  spoken_languages?: SpokenLanguage[];
  status?: string;
  tagline?: string;
  title: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

export interface BelongsToCollection {
  id?: number;
  name?: string;
  poster_path?: string;
  backdrop_path?: string;
}

export interface SpokenLanguage {
  english_name?: string;
  iso_639_1?: string;
  name?: string;
}

export interface ProductionСountry {
  iso_3166_1?: string;
  name?: string;
}

export interface ProductionСompany {
  id?: number;
  logo_path?: string;
  name?: string;
  origin_country?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Page {
  selectPage: string;
  totalPages: number | null;
}

export interface MovieLists {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  id: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

export type Action =
  | { type: "SEARCH_QUERY"; payload: string }
  | { type: "SELECTION_BY_POPULARITY"; payload: string }
  | { type: "SELECTION_PAGE"; payload: Page }
  | { type: "UPDATE_TOTAL_PAGES"; payload: Page }
  | { type: "SELECTION_BY_YEAR"; payload: number | number[] }
  | { type: "SELECTION_TOGGLE"; payload: Genre[] }
  | { type: "RESET_FILTER" };
