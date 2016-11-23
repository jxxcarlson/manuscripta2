import { Component } from '@angular/core';

import { Document, DocumentList } from './models/document'
import { ApiService } from './services/api.service'

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
            rendered_text: 'This is a <b>test</b> — as is the light blue color'
        },
        {
            id: '2', authorId: '12',
            title: 'Christmas',
            text: 'Santa says _ho ho ho!_',
            rendered_text: 'Santa says <i>ho ho ho!</i>'
        }

    ];

    documenArray:Document[] = []

    activeDocument:Document = this.documents[0];

    // http://tutorials.pluralsight.com/front-end-javascript/getting-started-with-angular-2-by-building-a-giphy-search-application
    performSearch(searchTerm: HTMLInputElement): void {

        console.log(`User entered: ${searchTerm.value}`);

        this.apiService.findDocuments(searchTerm.value)
            .subscribe(

                docList => console.log(docList)
                // docList => this.loadDocumentsFromDocumentList(docList)

            )

    }

    loadDocumentsFromDocumentList(docList: DocumentList): void {

        // var idList = docList.map( hash => hash.id )
        console.log('docList: ' + docList)
    }


    constructor(private apiService: ApiService) {}


    ngOnInit() {

        this.loadDocument(177)
        this.loadDocuments([76, 60, 78, 59, 226])

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