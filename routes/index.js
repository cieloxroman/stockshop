var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let query = "SELECT product_id, productname, prodimage, description, supplier_id, cost_per_ounce, catagory FROM product where homepage = true"; 
// execute query
db.query(query, (err, result) => {
if (err) {
console.log(err);
res.render('error');
}
 query =  "select promotitle, promoimage, startdate, enddate from promotion where startdate<=CURRENT_DATE() and enddate>=CURRENT_DATE();"
 db.query(query, (err, result2) =>{
  if (err) {
    console.log(err);
    res.render('error');
    }
    res.render('index', {allrecs: result, promos: result2 });
 });
});
});

module.exports = router;
