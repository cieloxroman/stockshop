var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let query = "SELECT product_id, productname, prodimage, description, supplier_id, cost_per_ounce, catagory FROM product where description like '%" 
  + req.query.searchcriteria +"%' or catagory like '%" 
  + req.query.searchcriteria +"%'";
  
// execute query
db.query(query, (err, result) => {
if (err) {
console.log(err);
res.render('error');
}
res.render('search', {allrecs: result });
});
});
//res.render('index', { passed: 'Hello?'});
// { books: booklist}
//{ title: 'Express' }
//router.post('/',function(req, res, next){
  //var username_in = req.body.username;
  //res.render('index', {username: username_in});
  
//});
module.exports = router;
