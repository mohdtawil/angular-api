import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
@Injectable()
export class AuthorsService {
    constructor(private http: HttpClient) {
    }
    getAll() {
        return this.http.get<any>('http://localhost:3000/authors').toPromise();
    }

    addNew(name: string, email: string) {
        const headers= new HttpHeaders().set('content-type', 'application/json');
        const body= JSON.stringify({
            name: name,
            email: email,
        });
        return this.http.post<any>('http://localhost:3000/authors/new' , body, { 'headers': headers }).toPromise();
    }

    remove(id: number) {
        return this.http.delete<any>('http://localhost:3000/authors/' + id).toPromise();
    }

    edit(name: string, email: string, id: number) {
        const headers= new HttpHeaders().set('content-type', 'application/json');
        const body= JSON.stringify({
            name: name,
            email: email,
        });
        return this.http.put<any>('http://localhost:3000/authors/' + id , body, { 'headers': headers }).toPromise();
    }
}