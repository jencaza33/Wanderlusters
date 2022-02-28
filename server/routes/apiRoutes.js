module.exports = (db) => {
  router.get('/places', (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.error("💩");
      return;
    }
    database.getAllPlaces(userId)
      .then(places => res.send({places}))
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });
    
};