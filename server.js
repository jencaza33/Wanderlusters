const PORT = process.env.PORT || 8000;
const express = require('express');
const app = express();
const methodOverride = require('express-method-override');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('booyah');
});



app.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}`);
});


module.exports = app;