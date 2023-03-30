export type AnimeTEMP = {
  title: string;
  synopsis: string;
  altTitles: string[];
  genres: string[];
};

export type MALAnimeInfo = {
  id: number;
  title: string;
  main_picture: {
    medium: string;
    large: string;
  };
  alternative_titles: {
    synonyms: string[];
    en: string;
    ja: string;
  };
  start_date: string;
  end_date: string;
  synopsis: string;
  mean: number;
  rank: number;
  popularity: number;
  num_list_users: number;
  num_scoring_users: number;
  nsfw: string;
  created_at: Date;
  updated_at: Date;
  media_type: string;
  status: string;
  genres: {
    id: number;
    name: string;
  }[];
  num_episodes: number;
  start_season: {
    year: number;
    season: string;
  };
  broadcast: {
    day_of_the_week: string;
    start_time: string;
  };
  source: string;
  average_episode_duration: number;
  rating: string;
  pictures: {
    medium: string;
    large: string;
  }[];
  background: string;
  related_anime: {
    node: {
      id: number;
      title: string;
      main_picture: {
        medium: string;
        large: string;
      };
    };
    relation_type: string;
    relation_type_formatted: string;
  }[];
  related_manga: any[];
  recommendations: {
    node: {
      id: number;
      title: string;
      main_picture: {
        medium: string;
        large: string;
      };
    };
    num_recommendations: number;
  }[];
  studios: {
    id: number;
    name: string;
  }[];
  statistics: {
    status: {
      watching: string;
      completed: string;
      on_hold: string;
      dropped: string;
      plan_to_watch: string;
    };
    num_list_users: number;
  };
};

export type AnilistInfo = {
  //
};
