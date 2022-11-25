const User = require("../models/User")
const Note = require("../models/Note")
const asyncHandler = require('express-async-handler')

// @desc Get all notes
// @route GET /notes
// @access Private 

const getAllNotes = asyncHandler(async(req,res)=> {
    const notes = await Note.find().select().lean()
    if (!notes?.length){
        return res.status(400).json({message:"No notes found!"})
    }
    res.json(notes)
})
// @desc Create new note
// @route POST /notes
// @access Private 


const createNewNote = asyncHandler(async(req,res)=> {
 const {user, title, text} = req.body

 // confirm data
 if (!user || !title || !text){
    return res.status(400).json({message: "All Fields are required!"})
 }
 // check for duplicate title
 const duplicate = await Note.findOne({title}).lean().exec()
 if (duplicate){
     return res.status(409).json({message: `Duplicate "${title}" title`})
    }
 const note = await Note.create({user, title, text})

 if (note){//created
    res.status(201).json({message:`New Note created `})
}
else{
    res.status(400).json({message:"Invalid Note Data Received"})
}
})


const updateNote = asyncHandler(async(req,res)=> {
    const {id, user, title, text, completed} = req.body

    // confirm data
    if (!id || !user || !title || !text){
        res.status(400).json({message:"All Field Required!"})
    }
    const note = await Note.findById(id).exec()
    if(!note){
        res.status(400).json({message:"Note not found!"})
    }

    // check for duplicate
    const duplicate = await Note.findOne({title}).lean().exec()
    // Only allow updates to original Note
    if(duplicate && duplicate?._id.toString() !== id){
        res.status(400).json({message:"Duplicate Title"})
    }
    note.user = user
    note.title = title
    note.text = text
    note.completed = completed


    const updatedNote = await note.save()
    res.json({message:`${updatedNote.title} updated successfully!`})
})

const deleteNote = asyncHandler(async(req,res)=> {
    const {id} = req.body
    if(!id){
        res.status(400).json({message:"Note ID required."})
    }
    const note = await Note.findById(id).exec()
    if(!note){
        res.status(400).json({message:'Note not found!'})
    }
    const result = await note.deleteOne()
    const reply = `Note "${result.title}" deleted!`

    res.json(reply)
})

module.exports = {
    getAllNotes,
    createNewNote,
    updateNote,
    deleteNote
}