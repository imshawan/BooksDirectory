const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const { json } = require('express')

const adapter = new FileSync('database.json')
const db = low(adapter)
db.defaults({ books: [] }).write()

function insertEntry(entry) {
// insert items and store it locally
    db.get('books').push(entry).write()
}

function getAllEntries() {
    // gets all the entries in the database
    data = db.get('books').value()
    console.log(data[data.length - 1].id)

    return db.get('books').value()
}

function getEntryById(args){
    // gets all the entries in the database according to the id specified
    var books = db.get('books')
    field = books.find({"id": parseInt(args)}).value();
    return field
}

function updateEntry(bookId, items){
    // Updates a selected entry in the database
    var books = db.get('books')
    books.find({id: parseInt(bookId)}).assign(items).write();
}

function deleteEntry(bookId){
    // takes parameter as bookId and deletes the corresponding field with the matching bookId
    var books = db.get('books')
    books.remove({id: parseInt(bookId)}).write();
}

function getLastID(){
    // gets the last record (used to generate a ID based on the Nth element)
    var data = db.get('books').value()
    return data[data.length - 1].id;
}

module.exports = {
    insertEntry,
    getAllEntries,
    getLastID,
    getEntryById,
    updateEntry,
    deleteEntry,
}