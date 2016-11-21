import { Component } from '@angular/core';

import { Document } from './models/document'
import { ApiService } from './services/api.service'
import { Response } from '@angular/http'


@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html',
    styleUrls: ['./app/app.component.css'],
    providers: [ ApiService ]
})
export class AppComponent {

    documents: Document[] = [
        {
            id: '1', authorId: '11',
            title: 'Test',
            text: 'This is a *test*',
            rendered_text: 'This is a <b>test</b>'
        },
        {
            id: '2', authorId: '12',
            title: 'Christmas',
            text: 'Santa says _ho ho ho!_',
            rendered_text: 'Santa says <i>ho ho ho!</i>'
        }

    ];

    activeDocument = this.documents[0];


    constructor(private apiService: ApiService) {}


    ngOnInit() {

        this.loadDocument()
    }

    loadDocument() {

        this.apiService.getDocument('11')
            .subscribe(

                doc => this.documents.push(doc)

            )
    }


    selectDocument(doc) {

        this.activeDocument = doc
        console.log(this.activeDocument);
    }


}


// https://vsavkin.com/angular-2-template-syntax-5f2ee9f13c6a#.by0izmvbj