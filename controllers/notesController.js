const User = require("../models/User")
const Note = require("../models/Note")
const asyncHandler = require('express-async-handler')

const getAllNotes = asyncHandler(async(req,res)=> {
    res.status(201).json({ message : `Get All Notes`})
})

const createNewNote = asyncHandler(async(req,res)=> {
    res.status(201).json({ message : `Create a new note`})
})

const updateNote = asyncHandler(async(req,res)=> {
    res.status(201).json({ message : `Update note`})
})

const deleteNote = asyncHandler(async(req,res)=> {
    res.status(201).json({ message : `Delete note`})
})

module.exports = {
    getAllNotes,
    createNewNote,
    updateNote,
    deleteNote
}