var express = require('express');
var passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let router = express.Router();
var mongoose = require('mongoose');
var multur = require('multer');


router.get('/', function(req, res){
    res.render('admin/login');
})

module.exports = router;
