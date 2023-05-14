import {FC, useState, useEffect} from "react";
import {filterCharacters} from "../../api";
import {ICharacter, ICharacterList, IListInfo} from "../../types/types";
import Preloader from "../../components/Preloader/Preloader";
import styles from './MainPage.module.scss'
import ListItem from "../../components/ListItem/ListItem";
import CharacterCard from "../../components/CharacterCard/CharacterCard";
import Pagination from "../../components/Pagination/Pagination";
import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";
import SearchCharacters from "../../components/SearchInput/SearchCharacters/SearchCharacters";


const MainPage: FC = () => {
    const [searchParams] = useSearchParams();

    const navigate = useNavigate()


    const [characters, setCharacters] = useState<Array<ICharacter>>([])
    const [charactersListInfo, setCharactersListInfo] = useState<IListInfo>()
    const [fetchError, setFetchError] = useState<any>()
    // @ts-ignore
    const [queryLinkObject, setQueryLinkObject] = useState<object>(Object.fromEntries([...searchParams]))
    const [queryLink, setQueryLink] = useState<string>()
    const [isNavigated, setIsNavigated] = useState<boolean>(false)
    const [page, setPage] = useState<string>()
    const [status, setStatus] = useState<string>()
    const [characterName, setCharacterName] = useState<string>()

    const filterCharactersBySearch = (data: ICharacterList): void => {
        setCharacters(data.results)
        setCharactersListInfo(data.info)
    }


     const getCharactersList = (): void => {
         if (queryLink)
             filterCharacters(queryLink).then(data => {
                 data.error ?
                     setFetchError(data.error)
                     :
                     setCharacters(data.results)
                 setCharactersListInfo(data.info)
             })

     }


    useEffect(() => {
        window.scrollTo(0, 0);
        // @ts-ignore
        setPage(queryLinkObject.page ? queryLinkObject.page : "1")
        // @ts-ignore
        setStatus(queryLinkObject.status ? queryLinkObject.status : "")
        // @ts-ignore
        setCharacterName(queryLinkObject.name ? queryLinkObject.name : "")

        // @ts-ignore
    }, [queryLinkObject])


    useEffect(() => {
        console.log(page, status, characterName, queryLinkObject)
        // @ts-ignore
        navigate({
            search: createSearchParams({
                page: page ? page : "1",
                name: characterName ? characterName : "",
                status: status ? status : ""
            }).toString()
        })
        setIsNavigated(true)
        
    }, [characterName, isNavigated, navigate, page, status])


    useEffect(() => {
        setQueryLink("?page=" + page + "&name=" + characterName + "&status=" + status)
    }, [characterName, isNavigated, page, status])


    useEffect(() => {
        console.log(queryLink)
        if (queryLink && !queryLink.includes('undefined'))
           getCharactersList()
    }, [queryLink])


    return (
        <div className={`container ${styles.container}`}>
            <SearchCharacters setCharacters={filterCharactersBySearch}/>
            {

                characters && characters.length && charactersListInfo ?
                    <>
                        <h5><span className="title fs-4">{charactersListInfo.count}</span> characters found</h5>
                        <ListItem items={characters}
                                  renderItem={(character: ICharacter) => <CharacterCard character={character}
                                                                                        key={character.id}/>}/>
                    </>

                    : fetchError ?
                        <>
                            {fetchError}
                        </>
                        :

                        <Preloader/>

            }

            {charactersListInfo?.pages && charactersListInfo.pages > 1 &&
                <Pagination pagination={charactersListInfo}/>}

        </div>
    )
}

export default MainPage