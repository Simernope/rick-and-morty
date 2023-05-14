
export interface ICharacter {
    "id": number,
    "name": string,
    "status": string,
    "species": string,
    "type": string,
    "gender": string,
    "origin": {
        "name": string,
        "url": string
    },
    "location": {
        "name": string,
        "url": string
    },
    "image": string,
    "episode": Array<string>,
    "url": string,
    "created": string
    "error"?: IError
}

export interface IListInfo {
        "count": number,
        "pages": number,
        "next": string,
        "prev": string

}

export interface ICharacterList{
    "info": IListInfo,
    "results":Array<ICharacter>
    "error"?: IError
}

export interface IError{
    "error": string
}