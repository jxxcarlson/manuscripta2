export class Document {

    public id: string;
    public authorId: string;
    public title: string;
    public text: string;
    public rendered_text: string;


    constructor(data = {}) {
        Object.assign(this, data);
    }


    /*
    constructor (id, authorId, title, text, renderedText) {

        this.id = id;
        this.authorId = authorId;
        this.title = title;
        this.text = text;
        this.renderedText = renderedText;
    }
*/


}

export class DocumentList {

    public status: string;
    public documentCount: number;
    public documents: DocumentHash[];

    constructor(data = {}) {
        Object.assign(this, data);
    }

}

export class DocumentHash {

    public id: string;
    public identifier; string;
    public title: string;

    constructor(data = {}) {
        Object.assign(this, data);
    }
}