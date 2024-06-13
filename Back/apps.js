const mongoose = require("mongoose");
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const dotenv = require('dotenv')
const membreRoutes = require('./routes/membreRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const commentRoutes = require('./routes/commentRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');

const app = express();

dotenv.config()

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());

app.get('/', (req, res) => {
    res.send("Server OK")
})

app.use('/members', membreRoutes);
app.use('/categories', categoryRoutes);
app.use('/comments', commentRoutes);
app.use('/recipes', recipeRoutes);
app.use('/ingredients', ingredientRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
.then(() => {
    console.log('Connexion au MongoDB réussie');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => {
    console.error('Connexion échouée:', err);
    process.exit(1); // Sortie du processus avec un code d'échec
});