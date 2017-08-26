var express = require("express");
var Contact =  require('../models/contact').Contact;

var router = express.Router();

// Get all contact
router.get("/contacts",function(req,res,next){
	Contact.find({},(err,data)=>{
		if(err){
			res.send(err);
		}
		res.json(data);
	})
})

// Saved data
router.post("/contact",(req,res,next)=>{
	var cont = req.body;
	if(!cont.firstname || !cont.firstname || !cont.firstname){
		res.status(400);
		res.json({
			'error':'bad data'
		})
	}
	var user = new Contact(cont);
	user.save((err,docs)=>{
		if(err){
			res.json({
				msg:'failed to add contact'
			});
		}
		res.json({'data':docs,'msg':'Contact added successfully'});
	})
})

// delete data
router.delete("/contact/:id",(req,res,next)=>{
		Contact.findOneAndRemove({_id:req.params.id},(err,docs)=>{
			if(err){
				res.send(err);
			}
			res.json({'data':docs,'msg':'Contact deleted successfully'});
		})
})

// Update data
router.put("/contact/:id",(req,res,next)=>{
	var fname = req.body.firstname;
	var lname = req.body.lastname;
	var phone = req.body.phone;
	Contact.findByIdAndUpdate({_id:req.params.id},{'firstname':fname,'lastname':lname,'phone':phone},{new: true},(err,data)=>{
		if(err){
			res.send(err);
		}
		res.json(data);
	})
})

module.exports = router;