const { render } = require('ejs');
const express = require('express');

const app = express();

app.set('view engine', 'ejs');
let storedata = []
let index = null;
let editdata = null;
app.get('/', (req, res) => {

    res.render('index', { data: storedata, editdata: editdata });
});

app.get('/createdata', (req, res) => {

    if (index != null) {
        storedata[index] = req.query;
        index = null;
        editdata = null;
    }
    else {
        storedata.push(req.query)
    }

    res.redirect('/')
})

app.get('/deletedata', (req, res) => {

    storedata.splice(req.query.delet, 1)
    res.redirect('/')
})
app.get('/updetedata', (req, res) => {
    index = req.query.updete;
    editdata = storedata[index];
    res.render('index', { editdata: editdata, data: storedata })
})
app.listen(3004)