import { Component, OnInit } from '@angular/core';
import { AuthorsService } from '../services/authors.service'
@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  
  message: any;
  
  
  authors: any = "edwe";

  
  id: number=0;
  name: string = '';
  email: string = '';


  buttonMode: any = 'add';


  constructor(private authorServices: AuthorsService) {
  }
  

  async getAuthors() {
    this.authors = await this.authorServices.getAll();
  }


 

  


  async addNewAuthor(name: string, email: string) {
    this.message = await this.authorServices.addNew(name , email);
    this.getAuthors();
  }

  async removeAuthor(id: number) {
    this.message = await this.authorServices.remove(id);
    this.getAuthors();
  }
  
  async editAuthor(name: string, email: string, id: number) {
  
    this.message = await this.authorServices.edit(name , email, id);
    this.getAuthors();
  }


  updatID(id: number) {
    this.id = id;
  }

  ngOnInit(): void {
    
   this.getAuthors();
  }

}
