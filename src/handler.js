const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (req, h) => {
  const { title, tags, body } = req.payload;

  // buat panggil nanoidnya
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  // buat masukkin nilai-nilainya kedalam array notes pake method push
  notes.push(newNote);

  // buat menentukan apakah newNote sudah masuk ke dalam array notes
  // pake filter() berdasarkan id catatan untuk mengetahuinya
  const isSuccess = notes.filter((note) => note.id).length > 0;

  // isSuccess buat nentuin respon nya. kalo true respon berhasil
  if (isSuccess){
  const response = h.response({
    status: 'success',
    message: 'Catatan berhasil ditambahkan',
    data: {
        noteId: id,
    },
  });
  response.code(201);
  return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

module.exports = { addNoteHandler };
