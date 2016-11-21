import {Directive, ElementRef, Renderer, Input} from '@angular/core';

@Directive({
    selector: '[textPageHeight]',
})
export class TextPageHeightDirective {

    private _defaultHeight = '1000px';

    constructor(public el: ElementRef, public renderer: Renderer) {

        this.height = window.innerHeight.toString()
        console.log('AA HEIGHT = ' + this.height)
        console.log('AA DEFAULT HEIGHT = ' + this._defaultHeight)
        renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'lightblue');
        renderer.setElementStyle(el.nativeElement, 'height', (window.innerHeight - 200).toString() + 'px' || this._defaultHeight );

    }

     @Input('textPageHeight') height: string;

}


// https://angular.io/docs/ts/latest/guide/attribute-directives.html