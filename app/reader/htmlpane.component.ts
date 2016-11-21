import { Component, Input } from '@angular/core';
import { Document } from '../models/document';

@Component({
    selector: 'html-pane',
    template: '<div class="rendered-document" [innerHTML]=document.rendered_text></div>'
})
export class HtmlPane {
    @Input() document:Document;
}
