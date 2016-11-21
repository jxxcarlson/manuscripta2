import { Component } from '@angular/core';

import { Document } from './models/document'
import { ApiService } from './services/api.service'
import { TextPane } from './textpane.component'
// import { MathJaxService } from './services/mathjax.service'



@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html',
    styleUrls: ['./app/app.component.css'],
    providers: [ ApiService, TextPane ]
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

    activeDocument:Document = this.documents[0];


    constructor(private apiService: ApiService) {}


    ngOnInit() {

        this.loadDocument(177)
        this.loadDocuments([76, 60, 78, 59])
    }

    loadDocument(id) {

        this.apiService.getDocument(id)
            .subscribe(

                doc => this.documents.push(doc)

            )
    }

    loadDocuments(idList) {

        // idList.forEach( function(id) { this.loadDocument(id) } )
        idList.forEach( (id) => this.loadDocument(id) )
    }


    selectDocument(doc) {

        this.activeDocument = doc
        console.log(this.activeDocument);
    }


}

// https://vsavkin.com/angular-2-template-syntax-5f2ee9f13c6a#.by0izmvbj