
import { Component, OnInit } from '@angular/core';
import { AuthorsService } from '../services/authors.service';
import { BoxesService } from '../services/boxes.service';
import {MatDialog} from '@angular/material/dialog';
import { ModalForAddAndUpdateComponent } from './modal-for-add-and-update/modal-for-add-and-update.component';
import { GenresService } from '../services/genres.service';
import { ActivatedRoute, Router } from '@angular/router';


export interface DialogData {
  title: 'Add New' | 'Edit';
  editID: any;
  editTitle: any;
  editDescription: any;
  editAuthor: any
  editGenresIDS: any
}




@Component({
  selector: 'app-boxes',
  templateUrl: './boxes.component.html',
  styleUrls: ['./boxes.component.css']
})
export class BoxesComponent implements OnInit  {
  
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [2, 4, 6, 8, 10, 20, 50, 100, 500, 1000];

  boxes: any;
  authors: any;
  genres: any;




  buttonMode: any = 'add';


  async pageChanged(event: any) {
    var dataFilter = await this.boxService.getFilterBoxes(++event.pageIndex , event.pageSize);
    this.boxes = dataFilter.items;
    this.route.navigate(['/boxes/page/' + event.pageIndex + '/limit/' + event.pageSize])
  }

  pageParamId: number = 0;
  limitParamId: number = 0;
  sub: any;
  


  constructor(private activateRoute: ActivatedRoute, private route: Router, private genreService: GenresService, private boxService: BoxesService, private authorServices: AuthorsService, public dialog: MatDialog) {}

  
  async getAllBoxes(page: number, limit: number) {
    var dataFilter = await this.boxService.getFilterBoxes(page , limit);
    this.boxes = dataFilter.items;
    this.length = dataFilter.meta.totalItems;
    this.pageSize = dataFilter.meta.itemsPerPage;
    
  }

  async getAuthors() {
    this.authors = await this.authorServices.getAll();
  }

  async getAllGenres() {
    this.genres = await this.genreService.getAll();
  }



  async remove(id: number) {
   const errorMessage =  this.boxService.remove(id);
    this.getAllBoxes(this.pageParamId, this.limitParamId);
  }


  
  
  


  



  async openAddDialog() {
    await this.dialog.open(ModalForAddAndUpdateComponent ,  {data: {
      title: 'Add New',
      editID: 0,
      editTitle: '',
      editDescription: '',
      editAuthor: 0
    }}).afterClosed().toPromise();
    this.getAllBoxes(this.pageParamId, this.limitParamId);
  }

  async openEditDialog(title: any, id: number, description: any, author: any, genresIDS: any) {
    await this.dialog.open(ModalForAddAndUpdateComponent, {data: {
      title: 'Edit',
      editID: id,
      editTitle: title,
      editDescription: description,
      editAuthor: author,
      editGenresIDS: genresIDS
    }}).afterClosed().toPromise();
    this.getAllBoxes(this.pageParamId, this.limitParamId);
  }

  async ngOnInit() {
    this.sub = await this.activateRoute.params.subscribe( async (params) => {
      this.pageParamId = await +params['pageId'];
      this.limitParamId = await +params['limitId'];
      this.getAllBoxes(this.pageParamId, this.limitParamId);
    })
    this.getAuthors();
    this.getAllGenres();
  }

}
