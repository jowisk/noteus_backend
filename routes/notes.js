const express = require("express");
const notesQueries = require("../controllers/notes");
const authMiddleware = require("../middleware/authMiddleware"); // Import the middleware
const router = express.Router();

router.use(authMiddleware.authenticateToken);

router.post("/post", async (req, res) => {
    const body = req.body;
    const user_id = req.user.user_id; // Assuming user_id is stored in the authentication middleware
    const newNote = await notesQueries.createNote(body, user_id);
    res.json(newNote);
});

router.get('/get', async (req, res) => {
    console.log('req ' + req.query.user_id)
    try {
        const user_id = req.query.user_id
        const notes = await notesQueries.readNotesForUser(user_id);
        res.json(notes);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put("/update/:uuid", async (req, res) => {
    const { uuid } = req.params;
    const updatedNoteData = req.body;
  
    try {
      const updatedNote = await notesQueries.updateNoteByUuid(uuid, updatedNoteData);
      res.json(updatedNote);
    } catch (error) {
      console.error('Error updating note:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

router.delete("/delete/:uuid", async (req, res) => {
    const { uuid } = req.params;
    try {
      const deletedNote = await notesQueries.deleteNoteByUuid(uuid);
      res.json(deletedNote);
    } catch (error) {
      console.error('Error deleting note:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;