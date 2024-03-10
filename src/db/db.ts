import { AlbumDto } from 'src/album/album.dto';
import { ArtistDto } from 'src/artist/artist.dto';
import { TrackDto } from 'src/track/track.dto';
import { UserDto } from 'src/user/user.dto';

export const db = {
  users: [],
  tracks: [],
  albums: [],
  artists: [],
  favorites: {
    albums: new Map(),
    artists: new Map(),
    tracks: new Map(),
  },
};

export interface DBType {
  users: UserDto[];
  tracks: TrackDto[];
  albums: AlbumDto[];
  artists: ArtistDto[];
  favorites: DBFavorites;
}

export interface DBFavorites {
  albums: Map<string, AlbumDto>;
  artists: Map<string, ArtistDto>;
  tracks: Map<string, TrackDto>;
}
