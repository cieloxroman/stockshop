var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let query = "SELECT product_id, productname, prodimage, description, cost_per_ounce, catagory FROM product where homepage = true"; 
// execute query
db.query(query, (err, result) => {
if (err) {
console.log(err);
res.render('error');
}
res.render('index', {allrecs: result });
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
