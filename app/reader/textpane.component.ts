import { Component, Input } from '@angular/core';
import { Document } from '../models/document';

@Component({
    selector: 'text-pane',
    template: `<div class="rendered-document">{{document.text}}</div>`,
    styles: [`.rendered-document {
    font-size: 2rem;
    height:1200px;
    overflow: scroll;
}`]
})
export class TextPane {
    @Input() document:Document;
}
