const NotesModel = require("../model/notes");
module.exports = {
    addNote: data => NotesModel.create(data)
}