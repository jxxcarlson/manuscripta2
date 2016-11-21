import {Directive, ElementRef, OnChanges, Input} from "@angular/core";
declare var MathJax: {
    Hub: {
        Queue: (param: Object[]) => void;
    }
}
@Directive({selector: '[mathJax]'})
export class MJD implements OnChanges {
    @Input("mathJax") private value: string = "";
    constructor(private element: ElementRef) {}
    ngOnChanges() {
        this.element.nativeElement.innerHTML = this.value;
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.element.nativeElement]);
    }
}

// SOURCE: http://ruinshe.moe/2016/05/31/support-mathjax-in-angular2/