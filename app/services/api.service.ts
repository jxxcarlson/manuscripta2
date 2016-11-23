/* * * ./app/comments/components/comment.service.ts * * */

// https://scotch.io/tutorials/angular-2-http-requests-with-observables
// https://medium.com/google-developer-experts/angular-2-introduction-to-new-http-module-1278499db2a0#.mlci5swkz



// Imports
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Document, DocumentList } from '../models/document'


@Injectable()
export class ApiService {
    // Resolve HTTP using the constructor
    constructor (private http: Http) {}
    // private instance variable to hold base url
    // private apiUrl = 'http://localhost:2300/api/comments';
    private apiUrl = 'http://localhost:2300/v1';

    // Fetch document
    // getDocument(id: string) : Observable<Document>{
    getDocument(id: string) : Observable<Document>{
        // ...using get request
        // return this.http.get('${this.apiUrl}/documents/${id}')
        // return this.http.get('http://localhost:2300/v1/documents/' + id)
        return this.http.get('http://xdoc-api.herokuapp.com/v1/documents/' + id)
        // ...and calling .json() on the response to return data
            .map((res:Response) => new Document(res.json()['document']))
            //...errors if any
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

    }

    findDocuments(queryString: string) : Observable<DocumentList>{
        return this.http.get('http://xdoc-api.herokuapp.com/v1/documents?' + queryString)
            .map((res:Response) => new DocumentList(res.json()))
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

    }
}

