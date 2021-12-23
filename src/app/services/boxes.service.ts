import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
@Injectable()
export class BoxesService {
    constructor(private http: HttpClient) {
    }
    getAll() {
        return this.http.get<any>('http://localhost:3000/boxes').toPromise();
    }

    addNew(title: string, id: any, description: string, genreid: any, fileSource: any) {
        const headers= new HttpHeaders().set('content-type', 'applcaton/x-www-form-urlencoded/form-data');
        const formData = new FormData();
        formData.append('image', fileSource);
        formData.append('title', title);
        formData.append('authorId', id);
        formData.append('description', description);
        formData.append('genres', genreid);
    
   
    console.log(fileSource);
        const body= JSON.stringify({
            title: title,
            author_id: id,
            description: description,
            genre_id: genreid,
            "box-picture": fileSource
        });
        return this.http.post<any>('http://localhost:3000/boxes/new' , formData).toPromise();
    }

    remove(id: number) {
        return this.http.delete<any>('http://localhost:3000/boxes/' + id).toPromise();
    }

    edit(title: string, id: number, description: string, auhtor: any, genreid: any, fileSource: any) {
      const formData = new FormData();
      formData.append('image', fileSource);
      formData.append('title', title);
      formData.append('authorId', auhtor);
      formData.append('description', description);
      formData.append('genreId', genreid);
      return this.http.put<any>('http://localhost:3000/boxes/' + id , formData).toPromise();
    }

    
    async searchThroughQuery(query: string) {
        return this.http.get<any>('http://localhost:3000/boxes/search/' + query).toPromise();
    }

    async searchThroughQueryWithAuthor(author: string , query: string) {
        return this.http.get<any>('http://localhost:3000/boxes/search/' + author +'/' + query).toPromise();
    }

    async getFilterBoxes(page: number , limit: number) {
        return this.http.get<any>('http://localhost:3000/boxes/filter?page=' + page + '&limit=' + limit).toPromise();
    }
}