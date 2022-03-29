export interface HallInterface{
    _id?: string,
    number: number,
    row: number,
    col: number,
    vipPrice: number,
    price: number,
    seats: Array<Array<String>>
};

export interface MovieInterface{
    _id?: string,
    name: string,
    length: number
};

export interface ShowTimeInterface {
    _id?: string,
    time: string,
    hall: HallInterface,
    movie: MovieInterface
};

export interface CustomerEventInterface {
    _id: string,
    date: string,
    time: string
    movie: MovieInterface,
    hall: HallInterface,
    showTime: string,
};

export interface OrderItem {
    row: number,
    seat: number,
    letter: string
};
