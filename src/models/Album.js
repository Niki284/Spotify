import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'AlbumItem',
  tableName: 'album_items',
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
      type: "many-to-one",
      cascade: true,
      joinColumn: true
    }
  }
});