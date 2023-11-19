export interface _PokemonsResponse {
    count:    number;
    next:     string;
    previous: null;
    results:  _Result[];
}

export interface _Result {
    name: string;
    url:  string;
}
