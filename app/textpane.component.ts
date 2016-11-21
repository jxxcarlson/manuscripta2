import { Component, Input } from '@angular/core';

@Component({
    selector: 'text-pane',
    // template: `<div class="rendered-document" [content]=activeDocument.rendered_text></div>`
    template: `<div class="rendered-document">Ho ho ho!</div>`
})
export class TextPane {
    @Input() content:string;
}
