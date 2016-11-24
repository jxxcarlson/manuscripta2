import { Component } from '@angular/core';

import { Document, DocumentHash , } from './models/document'
import { ApiService } from './services/api.service'
import { QueryParser } from './services/queryparser.service'

enum tocModeType {searchResults, documentContents};

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
            rendered_text: 'This is a <b>test</b> — as is the light blue color',
            links: {
                documents: [], parent: {title: 'foo', id: 22}
            }
        },
        {
            id: '2', authorId: '12',
            title: 'Christmas',
            text: 'Santa says _ho ho ho!_',
            rendered_text: 'Santa says <i>ho ho ho!</i>',
            links: { documents: [], parent: {} }
        }

    ];

    // APPLICATION STATE
    searchResults: Document[] = this.documents
    documentContents: Document[] = []
    activeDocument:Document = this.documents[0];  // XX:DANGER
    tocMode: tocModeType = tocModeType.searchResults


    // http://tutorials.pluralsight.com/front-end-javascript/getting-started-with-angular-2-by-building-a-giphy-search-application
    performSearch(searchTerm: HTMLInputElement): void {

        var qp: QueryParser = new QueryParser();

        console.log(`User entered: ${searchTerm.value}`);


        var apiQuery: string = qp.parse(searchTerm.value)

        console.log(`apiQuery: ${apiQuery}`);

        this.tocMode = tocModeType.searchResults

        this.apiService.findDocuments(apiQuery)
            .subscribe(

                docList => [ console.log(docList),  this.loadDocumentsFromDocumentList(docList.documents)]
            )

    }

    loadDocumentsFromDocumentList(docs: DocumentHash[]): void {

        this.documentContents = this.documents
        this.documents = []
        this.tocMode = tocModeType.documentContents
        docs.forEach( docHash => [this.loadDocument(docHash.id), console.log(docHash.title)] )
    }

    recallSearchResults(): void {

        this.documents = this.searchResults
    }

    loadSubdocuments(): void {

        this.searchResults = this.documents
        this.documents = []
        var doc = this.activeDocument
        var docs = doc.links.documents || []
        docs.forEach( docHash => [this.loadDocument(docHash.id), console.log(docHash.title)] )
    }


    constructor(private apiService: ApiService) {}


    ngOnInit() {

        this.loadDocument(177)
        // this.loadDocuments([76, 60, 78, 59, 226])

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


        if (doc.rendered_text === undefined) {

            this.apiService.getDocument(doc.id)
                .subscribe(

                    fetchedDoc => doc.rendered_text = fetchedDoc.rendered_text,
                    this.activeDocument = doc

                )


        } else {

            this.activeDocument = doc

        }
        console.log(this.activeDocument);
    }


}

// https://vsavkin.com/angular-2-template-syntax-5f2ee9f13c6a#.by0izmvbj