const NotesModel = require("../model/notes");
module.exports = {
    addNote: data => NotesModel.create(data),
    fetchNotes: (query) => NotesModel.find(query).populate({ path: "images", select: "image" })
}