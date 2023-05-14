import {FC} from "react";
import {ICharacter} from "../../types/types";
import styles from './CharacterCard.module.scss'
import {Link} from "react-router-dom";
interface CharacterCardProps{
    character: ICharacter
}
const CharacterCard:FC<CharacterCardProps> = ({character}) => {
    return(
        <div className="card">
            <img src={character.image} className="card-img-top" alt={character.name}/>
                <div className={`card-body ${styles.cardBody}`}>
                    <h5 className={`card-title fs-4 ${styles.cardTitle}`}>{character.name}</h5>
                    <ul className={`list-group list-group-flush ${styles.list}`}>
                        <li className="list-group-item d-flex justify-content-between align-items-start p-0">
                            <div className=" me-auto">
                                <div className="fs-5">Location</div>
                                {character.location.name}
                            </div>
                        </li>
                        <li className=" list-group-item d-flex justify-content-between align-items-start p-0">
                            <div className=" me-auto">
                                <div className="fs-5">Species</div>
                                {character.species}
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start p-0">
                            <div className=" me-auto">
                                <div className="fs-5">Status</div>
                                {character.status}
                            </div>

                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start p-0">
                            <div className=" me-auto">
                                <div className="fs-5">Gender</div>
                                {character.gender}
                            </div>
                        </li>
                    </ul>
                    <Link to={`character/${character.id}`} className="btn btn-secondary">full info</Link>
                </div>
        </div>
    )
}

export default CharacterCard