var express = require('express');
var router = express.Router();

function adminonly(req,res,next){ 
    if (!req.session.isadmin) 
    {return res.render('customer/login', {message: "You Need Admin Privileges"});}
    next();
    }

// ==================================================
// Route to list all records. Display view to list all records
// url: http://localhost:3028/product/
// ==================================================
router.get('/', function(req, res, next) {
let query = "SELECT product_id, productname, prodimage, description, supplier_id, cost_per_ounce, catagory, homepage FROM product"; 
// execute query
db.query(query, (err, result) => {
if (err) {
console.log(err);
res.render('error');
}
res.render('product/allrecords', {allrecs: result });
});
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
    let query = "SELECT product_id, productname, prodimage, description, supplier_id, cost_per_ounce, total_liters_in_storage, catagory, homepage FROM product WHERE product_id = " + req.params.recordid; 
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            let query = "select  review_id, comments, rating from review where product_id ="+req.params.recordid;
            db.query(query, (err, reviews) => {
                if (err) {
                    console.log(err);
                    res.render('error');
                }else{
                   res.render('product/onerec', {onerec: result[0], reviews: reviews });
                }
            });
        }
    });
});
// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', adminonly, function(req, res, next) {
    let query = "SELECT supplier_id, suppliername FROM supplier"; 
// execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
        res.render('product/addrec', {supplier: result});
    });
});
// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {
    let insertquery = "INSERT INTO product (productname, prodimage, description, supplier_id, cost_per_ounce, catagory, total_liters_in_storage, homepage) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"; 
    var homepagecheck = 0;
    if(req.body.homepage){
        homepagecheck = 1;
    }

    db.query(insertquery,[req.body.productname, req.body.prodimage, req.body.description, 
        req.body.supplier_id, req.body.cost_per_ounce, req.body.catagory, req.body.total_liters_in_storage, homepagecheck],(err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.redirect('/product');
    }
    });
});

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', adminonly, function(req, res, next) {
    let query = "SELECT product_id, productname, prodimage, description, supplier_id, cost_per_ounce, total_liters_in_storage, catagory, homepage FROM product WHERE product_id = " + req.params.recordid; 
    // execute query
    db.query(query, (err, result) => {
        if (err) {
        console.log(err);
        res.render('error');
    } else {
        let query = "SELECT supplier_id, suppliername FROM supplier"; 
        // execute query
            db.query(query, (err, suppliers) => {
                if (err) {
                    console.log(err);
                    res.render('error');
                }
                res.render('product/editrec', {onerec: result[0], supplier: suppliers});
            });
    } 
    });
    });
// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', adminonly, function(req, res, next) {
    let updatequery = "UPDATE product SET productname = ?, prodimage = ?, description = ?, supplier_id = ?, cost_per_ounce = ?, total_liters_in_storage = ?, catagory = ?, homepage = ? WHERE product_id = " + req.body.product_id; 
    var homepagecheck = 0;
    if(req.body.homepage){
        homepagecheck = 1;
    }

    
    db.query(updatequery,[req.body.productname, req.body.prodimage, req.body.description, req.body.supplier_id, req.body.cost_per_ounce, req.body.total_liters_in_storage, 
    req.body.catagory, homepagecheck],(err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.redirect('/product');
    }
    });
    });
// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', adminonly, function(req, res, next) {
    let query = "DELETE FROM product WHERE product_id = " + req.params.recordid; 
    // execute query
    db.query(query, (err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.redirect('/product');
    } 
    });
    });
module.exports = router;
