import { Injectable }     from '@angular/core';


@Injectable()
export class MathJaxService {

    constructor () {}

    typeset() {

        /*
        console.log('* MathJaxService, documentKind = ' + documentKind)
        if (documentKind == 'asciidoc-latex' || true ) {
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
            console.log(message + " 2. reloadMathJax called ");
        } else {
            console.log(message + " 2. skipping MathJax reload ");
        }
        */

        console.log('MathJaxService called: typeset')

    }

/*
    MathJax.Hub.Config({
    messageStyle: "none",
    tex2jax: {
        inlineMath: [["\\(", "\\)"]],
        displayMath: [["\\[", "\\]"]],
        ignoreClass: "nostem|nolatexmath"
    },
    asciimath2jax: {
        delimiters: [["\\$", "\\$"]],
        ignoreClass: "nostem|noasciimath"
    },
    TeX: { extensions: ["mhchem.js"] }
});
*/


}


