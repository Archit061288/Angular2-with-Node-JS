import { Component, OnInit } from '@angular/core';
import {Contact} from '../contact';
import {ContactService} from '../contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
	contacts:Contact[];
	firstname:string;
	lastname:string;
	phone:string;

	constructor(private contactservice:ContactService) { }

	  ngOnInit(){
	  	this.contactservice.getcontact()
	  	.subscribe(cont=>{
	  		this.contacts = cont;
	  		console.log(this.contacts,"contacts");
	  	})
	  }

	  deletecont(id){
	  	this.contactservice.deletecontact(id)
	  	.subscribe(cont =>{
	  			console.log(cont,"cont")
	  			for(var i=0;i<this.contacts.length;i++){
	  				if(this.contacts[i]['_id'] == id){
	  					this.contacts.splice(i,1);
	  				}		
	  			}
	  	})
	  }

	  addcont(){
	  	const newcont = {
	  		firstname:this.firstname,
	  		lastname:this.lastname,
	  		phone:this.phone
	  	}
	  	this.contactservice.addcontact(newcont)	
	  	.subscribe(cont=>{
	  		this.contacts.push(cont);
	  		this.contactservice.getcontact()
	  		.subscribe(cont=>{
	  		this.contacts = cont;
	  		console.log(this.contacts,"contacts");
	  	})
	  	})
	  	
	  }

}
