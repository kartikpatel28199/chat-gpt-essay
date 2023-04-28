/* eslint-disable no-undef */
/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.alterColumn("users", "password", { notNull: false });
  pgm.alterColumn("users", "salt", { notNull: false });
};

exports.down = (pgm) => {
  pgm.alterColumn("users", "password", { notNull: true });
  pgm.alterColumn("users", "salt", { notNull: true });
};
