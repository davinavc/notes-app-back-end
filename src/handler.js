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

// buat ngembaliin data dengan nilai notes di dalamnya
const getAllNotesHandler = () => ({
    status: 'success',
    data: {
      notes,
    },
  });

const getNoteByIdHandler = (req, h) => {
  // buat dapetin id dari request params
  const { id } = req.params;
  // buat dapetin objek note dengan id dari objek array note
  // pake filter() buat dapetin objek nya
  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined){
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editNoteByIdHandler = (req, h) => {
  // buat dapetin nilai id karna diedit berdasarkan id
  const { id } = req.params;
  const { title, tags, body } = req.payload;
  const updatedAt = new Date().toISOString();
  // findindex buat dapetin dulu index array pada objek sesuai id
  const index = notes.findIndex((note) => note.id === id);

  //  kalo misalkan note dengan id yg dicari ada maka index akan bernilai array index dari objek yg
  // dicari. Tapi kalo tidak ditemukan idnya maka index bernilai -1
  // if ini respons ketika index ditemukan idnya
  if (index !== -1){
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = h.response({
      status: 'sucess',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  // respon ketika id gagal ditemukan
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
};
