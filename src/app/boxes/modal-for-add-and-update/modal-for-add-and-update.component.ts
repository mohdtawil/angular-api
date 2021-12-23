import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthorsService } from 'src/app/services/authors.service';
import { BoxesService } from 'src/app/services/boxes.service';
import { GenresService } from 'src/app/services/genres.service';
import {DialogData} from '../boxes.component';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';

import {FormBuilder, FormGroup} from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

import { FormArray } from '@angular/forms';
import { ValidateSpaceInTitle } from '../shared-validator/title.validator';



@Component({
  selector: 'app-modal-for-add-and-update',
  templateUrl: './modal-for-add-and-update.component.html',
  styleUrls: ['./modal-for-add-and-update.component.css']
})
export class ModalForAddAndUpdateComponent implements OnInit {

  profileInfo: any;
  imageSrc: any;

  createForm() {
   
    this.profileInfo = this.fb.group({
      title:         [ (this.dialogTitle == "Add New")? '' : this.data.editTitle ,[ Validators.required , ValidateSpaceInTitle]],
      description:   [ (this.dialogTitle == "Add New")? '' : this.data.editDescription , Validators.required],
      authorID:      [ (this.dialogTitle == "Add New")? '' :  this.data.editAuthor , Validators.required],
      editID:        [ (this.dialogTitle == "Add New")? '' : this.data.editID , Validators.required],
      genresIDS:     [ (this.dialogTitle == "Add New")? '' : this.data.editGenresIDS , Validators.required],
      file:          [ (this.dialogTitle == "Add New")? '' : '' ],
      fileSource:    [ (this.dialogTitle == "Add New")? '' : '' ],
    })
  }
  
  onFileChange(event: any) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file)
      this.profileInfo.patchValue({
        fileSource: file
      });
    }
  }


  onSubmit() {
    // TODO: Use EventEmitter with form value
    // console.log("knknk")
    if(this.dialogTitle == "Add New") {
      this.addNew();
    } else {
      this.edit();
    }
    // console.log(this.profileInfo.value);
  }


  dropdownList: any = [];
  dropdownSettings: IDropdownSettings={};
  types: any[] = [];

 


  message: any;
  authors: any;
  genres: any;
  dialogTitle: any = this.data.title;
  editID: any = this.data.editID;
  editTitle: any = this.data.editTitle;
  editDescription: any = this.data.editDescription; 
  editAuthor: any = this.data.editAuthor;

  title: string = this.editTitle;
  id: number= this.editID;
  description: string = this.editDescription;
  auhtorID: number = this.editAuthor;
  genreID = [0,0,0];

  gen: any = [];
  

  
  constructor(private fb: FormBuilder, private genreService: GenresService, private boxesService: BoxesService, private authorServices: AuthorsService, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    
    this.createForm();
    
  }

  async addNew() {
    
    this.boxesService.addNew(
      this.profileInfo.get('title').value, 
      this.profileInfo.get('authorID').value,
      this.profileInfo.get('description').value,
      this.profileInfo.get('genresIDS').value,
      this.profileInfo.get('fileSource').value
    );
    this.dialog.closeAll();
  }

  async edit() {
    this.boxesService.edit(
      this.profileInfo.get('title').value, 
      this.profileInfo.get('editID').value,
      this.profileInfo.get('description').value,
      this.profileInfo.get('authorID').value,
      this.profileInfo.get('genresIDS').value,
      this.profileInfo.get('fileSource').value
    );
    this.dialog.closeAll();
  }

  async getAuthors() {
    this.authors = await this.authorServices.getAll();
  }

  async getAllGenres() {
    this.genres = await this.genreService.getAll();
  }

  


  async ngOnInit() {
    this.getAuthors();
    await this.getAllGenres()
    
    this.dropdownList = this.genres
    this.dropdownSettings = {
      idField: 'id',
      textField: 'name',
    };
  }

}
