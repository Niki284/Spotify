import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'SongItem',
  tableName: 'song_items',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
  },
  relations: {
    artist: {
      target: "ArtistItem",
      type: "one-to-one",
      cascade: true,
      joinColumn: true
    },
    playlists: {
      target: "PlaylistItem",
      type: "one-to-one",
      cascade: true,
      joinColumn: true
    }
  }
});