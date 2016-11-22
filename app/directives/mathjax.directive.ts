
import {Directive, ElementRef, Input} from 'angular2/core';

declare var MathJax: any;


@Directive({
    selector: '[MathJax]'
})
export class MathJaxDirective {
    @Input(' MathJax')
    texExpression:string;

    constructor(private el: ElementRef) {
    }

    ngOnChanges() {
        this.el.nativeElement.innerHTML = this.texExpression;
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.el.nativeElement]);
    }
}



// SOURCE: http://stackoverflow.com/questions/36370826/how-to-get-mathjax-working-with-angular2

// ANOTTHER SOURCE: http://ruinshe.moe/2016/05/31/support-mathjax-in-angular2/