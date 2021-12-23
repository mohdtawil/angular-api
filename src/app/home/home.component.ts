import { Component, OnInit } from '@angular/core';
import { BoxesService } from '../services/boxes.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import { AuthorsService } from '../services/authors.service';
import { async } from '@angular/core/testing';
import { GenresService } from '../services/genres.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedBook = '';
async valueSelected() {
   await this.getAllBooks();
   if(this.selectedBook == 'all') {
      this.getAllBooks()
   } else {
      this.books = this.books.filter((item: any) => item.author.name === this.selectedBook);
   }
}



  books: any=[];
  authors: any=[];
  genres: any = [];
  homeQueries: any;
  createQueries() {
    this.homeQueries = this.fb.group({
      searchQuery: [''],
      searchTitle: [''],
      searchDescription: [''],     
      genresIDS: [''], 
    })
  }
  items: any[] = [];
  async filterGenres() {
   var filter = this.homeQueries.value.genresIDS;
    this.items = [];
    // this.getAllBooks();
   if(filter.length == 0)
    this.getAllBooks() 
    for (let index = 0; index < filter.length; index++) {
        this.books.forEach(async (item: any) => {
           const genres = await item.genres;
           genres.forEach(async (element: any) => {
             if(filter[index] == element.id) {
              await  this.items.push(item);
             }
           });
        });
    }
    this.books = await this.items;  
  }
  
  constructor(private genresServices: GenresService, private boxesService: BoxesService, private fb: FormBuilder, private authorServices: AuthorsService) {
    
    this.createQueries();
  }

  async getAllBooks() {
    const books = await this.boxesService.getAll();
    this.books = books;
  }

  async getAllAuthors() {
    const authors = await this.authorServices.getAll();
    this.authors = authors;
  }

  async getAllGenres() {
    const genres = await this.genresServices.getAll();
    this.genres = genres;
  }
  async searchThroughQuery() {

    let wordSearch = await this.homeQueries.value.searchQuery;
    setTimeout(async () => {
        if (wordSearch == this.homeQueries.value.searchQuery) {
            if (this.homeQueries.value.searchQuery) {
              if(this.selectedBook.length == 0 || this.selectedBook == 'all') {
                const dataResult = await this.boxesService.searchThroughQuery(wordSearch);
                this.books = dataResult;
              } else {
                const dataResult = await this.boxesService.searchThroughQueryWithAuthor(this.selectedBook, wordSearch);
               console.log(dataResult);
                this.books = dataResult;
              }
                
            } else {
              if(this.selectedBook.length == 0 || this.selectedBook == 'all') {
                this.getAllBooks();
              } else {
                this.valueSelected();
              }
              
            }
        }
    }, 200);
    
  }

  async ngOnInit() {
    this.books = await this.boxesService.getAll();
    this.authors = await this.authorServices.getAll();
    this.createQueries();
    this.getAllGenres();
  }

}
