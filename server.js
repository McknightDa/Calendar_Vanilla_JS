const express = require('express');
const app = express();
const port = 8000;
const path = require('path');

app.use(express.static('Public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});

app.listen(port,()=>{
    console.log('server is running on port ' +port )
});
//