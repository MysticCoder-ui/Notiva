const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');


// To fetch all the User
router.get('/fetchallNotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
});

// to add the Notes 
router.post('/addNote', fetchuser,
    body("title").isLength({ min: 3 }).withMessage("Please enter at least 3 characters"),
    body("description").isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"), async (req, res) => {
        try {
            const { title, description } = req.body;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).send("Enter the credentials correctly");
            }

            const note = new Note({
                userId: req.user.id, title, description
            });

            const newNote = await note.save();

            res.json(newNote);
        } catch (error) {
            res.status(500).send("Internal server error");
        }
    }
)


// to update the notes
router.put('/updateNote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description } = req.body;

        const newnote = {};
        if (title) newnote.title = title;
        if (description) newnote.description = description;

        // Find note by ID
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not found");
        }

        // Debugging log
        console.log("Note userId:", note.userId.toString());
        console.log("Request user id:", req.user.id);

        // Check ownership
        if (note.userId.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // Update note
        note = await Note.findByIdAndUpdate(
            req.params.id,
            { $set: newnote },
            { new: true }
        );

        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// to delete the user
router.delete('/deleteNote/:id', fetchuser, async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if(!note){
          res.status(400).send("Not Found");
        }
        res.json(note);

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router;