export class Document {

    public id: string;
    public author_id: string;
    public title: string;
    public text: string;
    public rendered_text: string;
    public has_subdocuments: boolean;
    public links: {
        documents: DocumentHash []
        parent: {id: string, title: string}
    };



    constructor(data = {}) {
        Object.assign(this, data);
    }


    getParentId():string {

        if (this.links.parent == undefined) { return '-2' }
        if (this.links.parent.id == undefined) { return '-1' }
        return this.links.parent.id

    }

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