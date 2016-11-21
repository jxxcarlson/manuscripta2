import { Component, Input } from '@angular/core';
import { Document } from '../models/document';

@Component({
    selector: 'text-pane',
    // template: `<div class="rendered-document" [content]=activeDocument.rendered_text></div>`
    template: `<div class="rendered-document" >{{document.text}}</div>`
})
export class TextPane {
    @Input() document:Document;
}
