
import {Directive, ElementRef, Input} from 'angular2/core';



// import { MathJax } from '../../node_modules/mathjax/MathJax.js'

// import * as MJ from 'mathjax';

// var MathJax = require('mathjax')
//var MathJax = require('../../node_modules/mathjax/MathJax.js')

declare var MathJax: any;

import '../../node_modules/mathjax/MathJax.js'

@Directive({
    selector: '[MathJax]'
})

export class MathJaxDirective {

    @Input('MathJax') texExpression:string;

    // mathJaxObj: any;

    constructor(private el: ElementRef) {

        // this.mathJaxObj = new MathJax("MathJax")
    }

    ngOnChanges() {
        this.el.nativeElement.innerHTML = this.texExpression;
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.el.nativeElement]);
        // this.mathJaxObj.Hub.Queue(["Typeset", this.mathJaxObj.Hub, this.el.nativeElement]);
    }
}

// EXTERNAL JS code: http://x-team.com/2016/06/include-javascript-libraries-in-an-ionic-2-typescript-project/


// EXTERNAN JS code: https://github.com/AngularClass/angular2-webpack-starter/issues/570
// EXTERNAL JS code: https://medium.com/@s_eschweiler/using-external-libraries-with-angular-2-87e06db8e5d1#.nb6kd65cu
// EXTERNAL JS code: https://weblog.west-wind.com/posts/2016/Sep/12/External-JavaScript-dependencies-in-Typescript-and-Angular-2
// EXTERNAL JS code: https://www.thepolyglotdeveloper.com/2016/01/include-external-javascript-libraries-in-an-angular-2-typescript-project/

// SOURCE: http://stackoverflow.com/questions/36370826/how-to-get-mathjax-working-with-angular2

// ANOTTHER SOURCE: http://ruinshe.moe/2016/05/31/support-mathjax-in-angular2/