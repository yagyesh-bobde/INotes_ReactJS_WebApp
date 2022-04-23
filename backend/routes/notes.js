const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes')

// ROUTE 1: Fetching all notes
router.get('/fetchallnotes', fetchuser, async (req,res)=> {
    try {
        const notes = await Notes.find({user: req.user.id})
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("ERROR: Internal Server Error")
    }

})

// ROUTE 2: Adding notes
router.post('/addnote', fetchuser,[
    body('title' , 'Enter a valid title').isLength({min:5}),
    body('description', 'Enter a valid description').isLength({min:5})
], async (req,res)=> {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const {title,description,tag} = req.body;
        const note = new Notes({
            title, description,tag, user: req.user.id
        })
        await note.save()
    
        res.json(note) 
    } 
    catch (error) {
        console.error(error.message)
        res.status(500).send("ERROR: Internal Server Error")
    }
})


// ROUTE 3: Updating an existing note by id : /api/notes/updatenote/:id
router.put('/updatenote/:id', fetchuser, async (req,res)=> {
    const {title , description, tag} = req.body;
    try {
        const newNote = {};
        if (title) {
           if ( title.length > 5){ newNote.title = title}
        } 
        if (description) {
            if ( description.length > 5){ newNote.description = description}
         } 
        if (tag) {newNote.tag = tag} 
    
        let note = await Notes.findById(req.params.id)
        if (!note) {
            res.status(404).send("Not Found")
        }
        if (note.user.toString() !== req.user.id){
            res.status(401).send("Not Allowed")
        }
        
        note = await Notes.findByIdAndUpdate(req.params.id , {$set: newNote} , {new:true})
        res.json({note})
        
    }     catch (error) {
        console.error(error.message)
        res.status(500).send("ERROR: Internal Server Error")
    }


})


// ROUTE 4: Deleting an existing note by id : /api/notes/deletenote/:id
router.delete('/deletenote/:id', fetchuser, async (req,res)=> {
    try {
        let note = await Notes.findById(req.params.id)
        if (!note) {
             return  res.status(404).send("Not Found")
        }
        if (note.user.toString() !== req.user.id){
            return  res.status(401).send("Not Allowed")
        }
        
        note = await Notes.findByIdAndDelete(req.params.id)
         res.json({Success:"Deleted the note",note: note})

}  catch (error) {
        console.error(error.message)
        res.status(500).send("ERROR: Internal Server Error")
    }


})
module.exports = router