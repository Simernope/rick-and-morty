import {FC, useEffect, useState} from "react";
import styles from './CharacterPage.module.scss'
import {ICharacter} from "../../types/types";
import {useLocation} from "react-router-dom";
import {getCharacterById} from "../../api";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Preloader from "../../components/Preloader/Preloader";

const CharacterPage: FC = () => {
    const {pathname} = useLocation()
    const [characterInfo, setCharacterInfo] = useState<ICharacter>()
    const [queryCharacterId, setQueryCharacterId] = useState<number>()
    const [characterId, setCharacterId] = useState<string>()
    const [fetchError, setFetchError] = useState<any>()


    useEffect(() => {
        setQueryCharacterId(pathname.split("/").indexOf("character"))
    }, [pathname])

    useEffect(() => {
        if (queryCharacterId) {
            setCharacterId(pathname.split("/")[queryCharacterId + 1])
        }
    }, [pathname, queryCharacterId])

    useEffect(() => {
        if (characterId) {
            getCharacterById(characterId)
                .then(data => {
                    data.error ?
                        setFetchError(data.error)
                        :
                        setCharacterInfo(data)
                })
        }
    }, [characterId])

    return (
        <div className={`container ${styles.container}`}>
            {
                characterInfo ?
                    <>
                        <div className="row">
                            <Breadcrumbs name={characterInfo.name} id={characterInfo.id}
                                         prevPageTitle="Characters list"/>
                        </div>
                        <div className="row ">
                            <div className="col-sm-12 col-md-6 col-lg-5 ">
                                <img src={characterInfo.image} className={styles.imgFluid} alt={characterInfo.name}/>
                            </div>
                            <div className="col-md-6 col-lg col-sm-12 ">
                                <h1 className="display-6">{characterInfo.name}</h1>

                                <ul className="list-group flex-wrap " style={{height: "85%"}}>
                                    <li className="flex-grow-1 list-group-item d-flex align-items-center">
                                        <strong>{characterInfo.gender}</strong>
                                        <span className="badge bg-success mx-3">Character gender</span>
                                    </li>
                                    <li className="flex-grow-1 list-group-item d-flex  align-items-center">
                                        <strong>{characterInfo.status}</strong>
                                        <span className="badge bg-info mx-3">Life status</span>
                                    </li>
                                    <li className="flex-grow-1 list-group-item d-flex  align-items-center"
                                        role="button">
                                        <strong>{characterInfo.location.name}</strong>
                                        <span className="badge bg-primary mx-3">Location</span>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div className="row my-3">
                            <h1 className="display-6 my-3">Episodes</h1>
                            {characterInfo.episode.map((episode) =>
                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 my-2" key={episode} role="button">
                                    <div className={`card p-2 position-relative ${styles.card}`}>
                                        {episode}
                                        <span
                                            className={`position-absolute top-0 start-100 translate-middle badge bg-info text-light rounded-pill ${styles.showSpan}`}>
                                                episode <strong>{episode.split("/")[episode.split("/").length - 1]}</strong>
                                            </span>
                                    </div>

                                </div>
                            )}
                        </div>
                    </>
                    :
                    fetchError ?
                        <>{fetchError}</>
                        :
                        <Preloader/>
            }

        </div>
    )
}

export default CharacterPage