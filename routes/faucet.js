var express = require('express');
let ethUtil = require('../util/ethutil');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  var userAddr = req.body.userAddr;
  console.log(userAddr);
  let hash = ethUtil.giveEtherTo(userAddr, 12);
  if(!hash){
      res.status(503).send("failed to faulet, please try again later");
  }else{
      res.status(200).send("tx Hash: "+ hash);
  }
});

module.exports = router;
