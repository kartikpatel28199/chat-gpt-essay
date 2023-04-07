/* eslint-disable no-undef */
/* eslint-disable camelcase */
// import { MigrationBuilder } from "node-pg-migrate";

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("users", {
    id: {
      type: "int",
      notNull: true,
      primaryKey: true,
      sequenceGenerated: { increment: 1, precedence: "ALWAYS" },
    },
    name: { type: "varchar", notNull: true },
    email: { type: "varchar", notNull: true },
    is_active: { type: "boolean", default: true },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    deleted_at: {
      type: "timestamp",
      default: null,
    },
  });
  pgm.createTable("conversations", {
    id: {
      type: "int",
      notNull: true,
      primaryKey: true,
      sequenceGenerated: { increment: 1, precedence: "ALWAYS" },
    },
    is_active: { type: "boolean", default: true },
    user_id: {
      references: { name: "users" },
      type: "int",
      notNull: true,
      referencesConstraintName: "user_id",
    },
    start_date: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    end_date: {
      type: "timestamp",
      default: null,
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    deleted_at: {
      type: "timestamp",
      default: null,
    },
  });
  pgm.createTable("messages", {
    id: {
      type: "int",
      notNull: true,
      primaryKey: true,
      sequenceGenerated: { increment: 1, precedence: "ALWAYS" },
    },
    conversation_id: {
      references: { name: "conversations" },
      type: "int",
      notNull: true,
      referencesConstraintName: "conversation_id",
    },
    direction: { type: "varchar", default: null },
    message: { type: "text", default: null },
    is_sent: { type: "boolean", default: false },
    is_viewed: { type: "boolean", default: false },
    viewed_at: {
      type: "timestamp",
      default: null,
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    deleted_at: {
      type: "timestamp",
      default: null,
    },
  });
  pgm.createTable("messages_medias", {
    id: {
      type: "int",
      notNull: true,
      primaryKey: true,
      sequenceGenerated: { increment: 1, precedence: "ALWAYS" },
    },
    message_id: {
      references: { name: "messages" },
      type: "int",
      notNull: true,
      referencesConstraintName: "message_id",
    },
    media_path: { type: "varchar", default: null },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};

exports.down = (pgm) => {};
