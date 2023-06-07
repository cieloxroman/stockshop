var express = require('express');
var router = express.Router();
// ==================================================
// Route to list all records. Display view to list all records
// url: http://localhost:3028/product/
// ==================================================
router.get('/', function(req, res, next) {
let query = "SELECT review_id, product_id, customer_id, rating FROM review"; 
// execute query
db.query(query, (err, result) => {
if (err) {
console.log(err);
res.render('error');
}
res.render('review/allrecords', {allrecs: result });
});
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
    let query = "SELECT review_id, customer_id, product_id, reviewdate, comments, rating FROM review WHERE review_id = " + req.params.recordid; 
    // execute query
    db.query(query, (err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.render('review/onerec', {onerec: result[0] });
    } 
    });
    });
// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function(req, res, next) {
    res.render('review/addrec');
    });


router.post('/subreview', function(req, res, next) {
    if (typeof req.session.customer_id !== 'undefined' && req.session.customer_id ) {   
        res.render('review/subreview', {prod_id: req.body.product_id});
    }else{
        res.redirect('/customer/login');
    }
});


// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {
    let insertquery = "INSERT INTO review (customer_id, product_id, reviewdate, comments, rating) VALUES (?, ?, now(), ?, ?)"; 
    db.query(insertquery,[req.body.customer_id, req.body.product_id, req.body.comments, req.body.rating],(err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.redirect('/');
    }
    });
});

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
    let query = "SELECT review_id, customer_id, product_id, reviewdate, comments, rating FROM review WHERE review_id = " + req.params.recordid; 
    // execute query
    db.query(query, (err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.render('review/editrec', {onerec: result[0] });
    } 
    });
    });
// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
    let updatequery = "UPDATE review SET reviewdate = ?, comments = ?, rating = ? WHERE review_id = " + req.body.review_id; 
    db.query(updatequery,[req.body.reviewdate, req.body.comments, req.body.rating],(err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.redirect('/review');
    }
    });
    });
// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
    let query = "DELETE FROM review WHERE review_id = " + req.params.recordid; 
    // execute query
    db.query(query, (err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.redirect('/review');
    } 
    });
    });
module.exports = router;
