const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: (req, h) => {
      const {
        id, title, createdAt, updatedAt, tags, body,
      } = req.query;
      return `${id} ${title} ${createdAt} ${updatedAt} ${tags} ${body}`;
    },
  },
];
module.exports = routes;
