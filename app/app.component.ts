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

    // Initial data
    docHash1 =  new DocumentHash ({
        id: '1', author_id: '11',
        title: 'Test',
        text: 'This is a *test*',
        rendered_text: 'This is a <b>test</b> — as is the light blue color',
        links: { documents: [], parent: {title: 'foo', id: 22} }
    })

    docHash2 =  new DocumentHash({
        id: '2', author_id: '12',
        title: 'Christmas',
        text: 'Santa says _ho ho ho!_',
        rendered_text: 'Santa says <i>ho ho ho!</i>',
        links: { documents: [], parent: {} }
    })


    // documents: Document[] = [new Document(this.docHash1), new Document(this.docHash2) ];
    documents: Array<Document> = [new Document(this.docHash1), new Document(this.docHash2) ];

    // APPLICATION STATE
    searchResults: Array<Document> = this.documents
    documentContents: Array<Document> = []
    activeDocument:Document = this.documents[0];  // XX:DANGER
    parentDocument:Document
    tocMode: tocModeType = tocModeType.searchResults
    contentsVisible: boolean = false


    // SEARCH

    searchResultsColor() {

        return this.tocMode === tocModeType.searchResults ? 'darkRed' : '#444'
    }

    contentsColor() {

        return this.tocMode === tocModeType.documentContents ? 'darkRed' : '#444'
    }

    displayContents() {

        return this.contentsVisible
    }


    // http://tutorials.pluralsight.com/front-end-javascript/getting-started-with-angular-2-by-building-a-giphy-search-application
    performSearch(searchTerm: HTMLInputElement): void {

        var qp: QueryParser = new QueryParser();

        var apiQuery: string = qp.parse(searchTerm.value)

        this.tocMode = tocModeType.searchResults
        this.contentsVisible = false

        this.apiService.findDocuments(apiQuery)
            .subscribe(

                docList => [ console.log(docList),  this.loadDocumentsFromDocumentList(docList.documents)]
            )

    }

    loadDocumentsFromDocumentList(docs: DocumentHash[]): void {

        this.documentContents = this.documents
        this.documents = []
        docs.forEach( docHash => [this.loadDocument(docHash.id), console.log(docHash.title)] )
        // this.activeDocument = this.documents[0]
    }

    recallSearchResults(): void {

        this.tocMode = tocModeType.searchResults
        this.documentContents = this.documents
        this.documents = this.searchResults
    }

    recallDocumentContents(): void {

        this.tocMode = tocModeType.documentContents
        this.searchResults = this.documents
        this.documents = this.documentContents
        if (this.documentContents == []) { this.loadSubdocuments() }

    }

    loadSubdocuments(): void {

        this.tocMode = tocModeType.documentContents
        this.contentsVisible = true
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


    assignParent(id) {

        this.apiService.getDocument(id)
            .subscribe(

                doc => this.parentDocument = doc

            )
    }

    loadParentDocument() {

        console.log('loadParentDocument')

        var bailOut = this.activeDocument.links.parent == undefined
        if (bailOut) { return }
        bailOut = this.activeDocument.links.parent.id == undefined
        if (bailOut) { return }

        var parentId = this.activeDocument.links.parent.id
        this.assignParent(parentId)

    }

    makeParentDocumentActive(): void {

        this.activeDocument = this.parentDocument
        this.loadSubdocuments()
    }

    loadDocuments(idList) {

        idList.forEach( (id) => this.loadDocument(id) )
    }


    selectDocument(doc:Document) {


        if (doc.rendered_text === undefined) {

            this.apiService.getDocument(doc.id)
                .subscribe(

                    fetchedDoc => [doc.rendered_text = fetchedDoc.rendered_text,
                    this.activeDocument = doc ]
                )


        } else {

            this.activeDocument = doc
            this.loadParentDocument()
            doc.has_subdocuments ? this.loadSubdocuments(): ''
            if (this.parentDocument != undefined && doc.links.parent.title == this.parentDocument.title) {

                console.log('(1*) doc parent: ' + doc.links.parent.title)
                this.tocMode = tocModeType.documentContents

            } else {

                console.log('Did not set this.tocMode = tocModeType.documentContents')
                console.log('(2) doc parent: ' + doc.links.parent.title)
                if (this.parentDocument != undefined) {

                    console.log('(2) system parent: ' + this.parentDocument.links.parent.id)
                }
            }
        }
    }


}

// https://vsavkin.com/angular-2-template-syntax-5f2ee9f13c6a#.by0izmvbj


