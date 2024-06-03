export interface Location2{
    name : string, url : string
}
export interface Origin{
    name : string, url : string
}

export interface Character {
    created : string;
    episode : string[];
    gender : string;
    image : string
    id: number;
    location : Location2;
    name: string;
    origin : Origin;
    species : string;
    status : string
    url : string,
    type : string,
}
export interface Episode {
    id: number;
    name : string;
    url : string;
    air_date : string;
    characters : string[],
    episode : string;
    created : string;
}

export interface Location {
    id: number;
    name: string;
    url : string;
    type : string;
    dimension : string;
    created: string;
    residents : string[];
}
export interface Dataset{
    characters : Character[],
    episodes : Episode[],
    locations : Location[]
}
