const {
  addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
  {
    // baut nampilin catatan nya di homepage
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  {
    // buat nampilin catatannya berdasarkan id
    // misal simpen catatan travel nah nampilin page travel itu doang
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },
  {
    // baut nampilin catatan nya di homepage
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler,
  },
];
module.exports = routes;
