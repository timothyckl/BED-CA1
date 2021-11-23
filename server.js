// entry point
const app = require('./controller/app');
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});