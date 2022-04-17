import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'ArtistItem',
  tableName: 'artist_items',
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
      albums: { 
        target: "AlbumItem",
        type: "one-to-many",
        cascade: true,
        joinColumn: true
      }
    },
});
