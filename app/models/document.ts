export class Document {

    public id: string;
    public authorId: string;
    public title: string;
    public text: string;
    public renderedText: string;


    constructor (id, authorId, title, text, renderedText) {

        this.id = id;
        this.authorId = authorId;
        this.title = title;
        this.text = text;
        this.renderedText = renderedText;
    }



}
