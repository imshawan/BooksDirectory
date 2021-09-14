const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const { json } = require('express')

const adapter = new FileSync('database.json')
const db = low(adapter)
db.defaults({ books: [] }).write()

function insertEntry(entry) {
// store it locally
    db.get('books').push(entry).write()
}

function getAllEntries() {
    return db.get('books').value()
}

function getEntryById(args){
    var books = db.get('books').value()
    field = books.find({"id": args}).value();
    return field
}

function updateEntry(items){
    var books = db.get('books').value()
//     postStore.find({ id: items.id })
//    .assign({name: "new name"})
//    .value();
}

function getLastID(){
    var database = fs.readFileSync('database.json');
    var data = JSON.parse(database);
    data = Object.values(data.books).length;
    return data;
}

module.exports = {
    insertEntry,
    getAllEntries,
    getLastID,
    getEntryById,
}