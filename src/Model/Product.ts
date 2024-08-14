export class Product {
    //public id!: String;
    constructor(
        public title: string,
        public imageURL: string | null,
        public description: string,
        public price: number,
        public stock: number,
        public categoryId: string
    ){}
}