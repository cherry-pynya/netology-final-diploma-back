export interface HallInterface{
    _id: string,
    number: number,
    row: number,
    col: number,
    vipPrice: number,
    price: number,
    seats: Array<Array<String>>
};

export interface MovieInterface{
    name: string,
    length: number
};
