var express = require('express');
var router = express.Router();

// ==================================================
// Route to list all records. Display view to list all records
// url: http://localhost:3028/product/
// ==================================================
router.get('/', function(req, res, next) {
let query = "SELECT firstname, lastname, employee_id, location_id FROM employees"; 
// execute query
db.query(query, (err, result) => {
if (err) {
console.log(err);
res.render('error');
}
res.render('employees/allrecords', {allrecs: result });
});
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
    let query = "SELECT firstname, lastname, employee_id, start_date, pay, location_id FROM employees WHERE employee_id = " + req.params.recordid; 
    // execute query
    db.query(query, (err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.render('employees/onerec', {onerec: result[0] });
    } 
    });
    });
// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function(req, res, next) {
    let query = "SELECT location_id, address FROM locations"; 
// execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
        res.render('employees/addrec', {locations: result});
        });
});
// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {
    let insertquery = "INSERT INTO employees (firstname, lastname, start_date, pay, location_id) VALUES (?, ?, ?, ?, ?)"; 
    db.query(insertquery,[req.body.firstname, req.body.lastname, req.body.start_date, 
        req.body.pay, req.body.location_id],(err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.redirect('/employees');
    }
    });
});

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
    let query = "SELECT employee_id, firstname, lastname, pay, start_date, location_id FROM employees WHERE employee_id = " + req.params.recordid; 
    // execute query
    db.query(query, (err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.render('employees/editrec', {onerec: result[0] });
    } 
    });
    });
// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
    let updatequery = "UPDATE employees SET firstname = ?, lastname = ?, pay = ?, start_date=?, location_id = ? WHERE employee_id = " + req.body.employee_id; 
    db.query(updatequery,[req.body.firstname, req.body.lastname, req.body.pay, req.body.start_date, req.body.location_id],(err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.redirect('/employees');
    }
    });
    });
// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
    let query = "DELETE FROM employees WHERE employee_id = " + req.params.recordid; 
    // execute query
    db.query(query, (err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.redirect('/employees');
    } 
    });
    });
module.exports = router;
