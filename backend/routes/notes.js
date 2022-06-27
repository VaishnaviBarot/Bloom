const express = require("express");
const { model, models } = require("mongoose");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require('../Middleware/fetchuser');
const Note = require("../models/Notes");

//Route - 1 || Add a New Notes using: POST "/api/notes/addnote", Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid Title').isLength({ min: 3 }),
    body('description', 'Descripption must be  atleast 5 characters.').isLength({ min: 5 }),
], async (req, res) => {

    try {

        const { title, description, tag } = req.body;

        //If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })

        const saveNote = await note.save();

        res.json(saveNote);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Interval Server Error.");
    }

})

//Route - 2 || Get all the Notes using: GET "/api/notes/fetchnotes", Login required
router.get('/fetchallnotes', async (req, res) => {

    try {
        const notes = await Note.find();
        res.json(notes);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Interval Server Error.");
    }

})
router.get('/fetchnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Interval Server Error.");
    }

})
//Route - 3 || Update an existing Notes using: PUT "/api/notes/updatenotes/:id", Login required
router.put('/updatenotes/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;

    try {
        //Create a New note object
        const newNote = {};

        if (title) {
            newNote.title = title;
        }

        if (description) {
            newNote.description = description;
        }

        if (tag) {
            newNote.tag = tag;
        }

        //Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Interval Server Error.");
    }



})

//Route - 4 || Delete an existing Notes using: DELETE "/api/notes/deletenotes/:id", Login required
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;

    try {

        //Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        //Allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted.", note: note });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Interval Server Error.");
    }



})


router.get("/search/:key", async (req, res) => {
    try {
      const notes = await Note.find({
        $or: [
          { title: { $regex: req.params.key } },
          { tag: { $regex: req.params.key } },
        ],
      });
      res.json(notes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Interval Server Error.");
    }
  });







  router.put('/getlike/:id', fetchuser, async (req, res) => {

    const { like } = req.body;

    try {
        //Create a New note object
        const newNote = {};

        if (like) {
            newNote.like = like;
        }


        //Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    }

    catch (error) {
        console.error(error.message);
        res.status(500).send("Interval Server Error.");
    }



})



















module.exports = router;