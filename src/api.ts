import {ICharacter, ICharacterList} from "./types/types";




export const getCharactersPageByPageNumber = async (number:string | undefined): Promise<ICharacterList> => {
    const response = await fetch('https://rickandmortyapi.com/api/character?page=' + number)
        .then(response => response.json())
    return await response
}



export const getCharacterById = async (id:string): Promise<ICharacter> => {
    const response = await fetch('https://rickandmortyapi.com/api/character/' + id)
        .then(response => response.json())
    return await response
}

export const filterCharacters = async (queryParams:string): Promise<ICharacterList> => {
    const response = await fetch('https://rickandmortyapi.com/api/character/' + queryParams)
        .then(response => response.json())
    return await response
}



























