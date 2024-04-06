const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig.development);

const createNote = (body) => {
  console.log(body)
  return knex("notes").insert({
    ...body,
    user_id: body.user_id,
  });
};

const readNotesForUser = async (user_id) => {
  console.log('notesforuser ' + user_id)
  try {
      const allNotes = await knex("notes").where({ user_id: user_id }).select("*");

      const archivedNotes = allNotes.filter((note) => note.archived);
      const nonArchivedNotes = allNotes.filter((note) => !note.archived);

      return { archivedNotes, nonArchivedNotes };
  } catch (error) {
      console.error('Error fetching notes:', error);
      throw error;
  }
};

const updateNoteByUuid = async (uuid, updatedNoteData) => {
  await knex("notes").where({ uuid }).update(updatedNoteData);
  const updatedNote = await knex("notes").where({ uuid }).first();
  return updatedNote;
};

const deleteNoteByUuid = async (uuid) => {
  const deletedNote = await knex("notes").where({ uuid }).first();
  await knex("notes").where({ uuid }).del();
  return deletedNote;
};

module.exports = {
  createNote,
  readNotesForUser,
  updateNoteByUuid,
  deleteNoteByUuid,
};