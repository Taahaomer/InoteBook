const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { validationResult } = require("express-validator");

// Route: for fetching all notes GET "/api/notes/fetchallnotes" - login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
  }
});

// Route: adding a new note using POST "/api/notes/addnote" - login required
router.post("/addnote", fetchuser, 
  // [
  //   body("title", "Enter a valid title").isLength({ min: 3 }),
  //   body("description","A description must be atleast 5 characters long",).isLength({ min: 5 }),
  // ],
  async (req, res) => {
    try {
      if(req.body.title.replace(/\s/g, '')==="" ){
        return res.status(400).send("Title can't be empty");
      }
      const title = req.body.title || " ";
      const description = req.body.description || " ";
      const tag = req.body.tag || " ";
      
      // if there are errors then return bad request and console.log the errors
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
      }

      const note = new Notes({
        title, description, tag, user: req.user.id
      })
      const savedNote = await note.save();

      res.json(savedNote);

    } catch (error) {
      console.log(error.message);
      res.status(500).send("some error occurred");
    }
  }
);

// Route: updating a note using PUT "/api/notes/updatenote" - login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    try{
     // find if the noteexists
        var note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not found!")};

    // find if the user is owner of the note
        if(note.user.toString() !== req.user.id){
            console.log(note.user.id.toString())
            console.log(req.user.id)
            return res.status(401).send("Not allowed!")}

    // Create a new note object 
        const {title, description, tag} = req.body; 
        const newNote = {};
        if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag};

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.json({note})
    } catch (error) {
      console.log(error.message);
      res.status(500).send("some error occurred");
    }

 })

 // Route: deleting a note using DELETE "/api/notes/deleteenote" - login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try{
    // find if the noteexists
        var note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not found!")};

    // find if the user is owner of the note
        if(note.user.toString() !== req.user.id){
            console.log(note.user.id.toString())
            console.log(req.user.id)
            return res.status(401).send("Not allowed!")}

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json("Deleted successfully!")
    } catch (error) {
      console.log(error.message);
      res.status(500).send("some error occurred");
    }
})

module.exports = router;
