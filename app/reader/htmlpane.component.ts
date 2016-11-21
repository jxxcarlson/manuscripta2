import { Component, Input } from '@angular/core';
import { Document } from '../models/document';

@Component({
    selector: 'html-pane',
    template: '<div class="rendered-document" [innerHTML]=document.rendered_text></div>',
    styles: [`.rendered-document {
    font-size: 1.75rem;
    height: calc(100% - 100px);
    overflow: scroll;
}`]
})
export class HtmlPane {
    @Input() document:Document;

}
