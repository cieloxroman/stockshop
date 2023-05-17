var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
  res.render('reports/reportmenu');
});

router.get('/custreport', function(req, res, next) {
  let query = "SELECT customer_id, firstname, lastname FROM customer"; 
// execute query
db.query(query, (err, result) => {
  if (err) {
      console.log(err);
      res.render('error');
  }
  res.render('reports/custreport', {allrecs: result });
  });
});

router.get('/prodreport', function(req, res, next) {
  let query = "SELECT product_id, productname, prodimage, description, supplier_id, cost_per_ounce, catagory, homepage FROM product"; 
  // execute query
  db.query(query, (err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  }
  res.render('reports/prodreport', {allrecs: result });
  });
  });

  router.get('/salereport', function(req, res, next) {
    let query = "SELECT order_id, customer_id FROM saleorder"; 
    // execute query
    db.query(query, (err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    }
    res.render('reports/salereport', {allrecs: result });
    });
    });

module.exports = router;
