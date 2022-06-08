const { Model } = require("objection");
const knex = require("../config/config");
Model.knex(knex);

class Gallery extends Model {
  static get tableName() {
    return "gallery";
  }
  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "integer" },
        image_url: { type: "string" },
        created_at: { type: "date" },
      },
    };
  }
}
module.exports = Gallery;
