// entry point
require('dotenv').config({ path: './.env' });
const app = require('./controller/app');
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});