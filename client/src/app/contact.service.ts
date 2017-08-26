import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {Contact} from './contact';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactService {

  constructor(private http:Http) { }

  getcontact(){
  	return this.http.get("http://localhost:8000/api/contacts")
  	.map(res=>res.json())
  }

  addcontact(cont){
  	var header = new Headers();
  	header.append('Content-Type','application/json');
  	return this.http.post("http://localhost:8000/api/contact",JSON.stringify(cont),{headers:header})
  		   .map(res=>res.json())
  }

  deletecontact(id){
  	return this.http.delete("http://localhost:8000/api/contact/"+id)
  			.map(res=>res.json())
  }

  updatecontact(cont){
  	var header = new Headers();
  	header.append('Content-Type','application/json');
  	return this.http.post("http://localhost:8000/api/contact/"+cont._id,JSON.stringify(cont),{headers:header})
  		   .map(res=>res.json())
  }


}
