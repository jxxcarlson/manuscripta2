import { Component } from '@angular/core';

import { Document } from './models/document'
import { ApiService } from './services/api.service'
// import { TextPane } from './reader/textpane.component'
// import { MathJaxService } from './services/mathjax.service'

import { Observable} from 'rxjs/Rx';
import {BehaviorSubject} from "rxjs/Rx";

const windowSize$ = new BehaviorSubject(getWindowSize());
//Observable.fromEvent(window, 'resize')
//  .map(getWindowSize)
//  .subscribe(windowSize$);

function getWindowSize() {

    return {
        height: window.innerHeight,
        width: window.innerWidth
    };
}

@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html',
    styleUrls: ['./app/app.component.css'],
    providers: [ ApiService ]
})

export class AppComponent {

    // textPaneHeight = 500;
    // twHeight = 700;

    // size$ = windowSize$.do(o => console.log('size:', o));
    // size$ = windowSize$.do(o => this.twHeight = o.height);

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

    activeDocument:Document = this.documents[0];


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