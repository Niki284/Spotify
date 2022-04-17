import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'PlaylistItem',
  tableName: 'playlist_items',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    }
  },
    relations: {
      user: { 
        target: "User",
        type: "one-to-one",
        cascade: true,
        joinColumn: true
      },
      songs: {
        target: "SongItem",
        type: "many-to-many",
        cascade: true,
        joinColumn: true
      }
    },
});
