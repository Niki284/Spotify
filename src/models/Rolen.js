import typeorm from "typeorm";

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: "Rolen",
  tableName: "rolen",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    label: {
      type : "int",
    },
  },
  relations: {
    user: {
      target: "User",
      type: "one-to-many",
      joinColumn: true,
      cascade: true,
      inverseSide: 'rolen'
    }
  }
});
