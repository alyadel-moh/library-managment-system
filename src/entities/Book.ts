import type Author from "./Author";
import type Category from "./Category";
import type Publisher from "./Publisher";

export default interface Book1 {
    isbn : string;
    title : string;
    publicationYear : number;
    publisher : Publisher;
    authors : Array<Author>;
    category : Category;
    sellingPrice : number;
    stockQuantity   : number;
    threshold : number;
    photoUrl: string | null;
    description: string | null;
    averageRating: number | null;
}
export interface Book2 {
    isbn : string;
    title : string;
    publicationYear : number;
    publisherId : number;
    authorIds : Array<string>;
    categoryId : number;
    sellingPrice : number;
    stockQuantity : number;
    threshold : number;
    photoUrl: string | null;
    description: string | null;
    averageRating: number | null;
}