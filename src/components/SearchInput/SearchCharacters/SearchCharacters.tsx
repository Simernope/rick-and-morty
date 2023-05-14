import React, {FC, useEffect, useState} from "react";
import {ICharacterList} from "../../../types/types";
import {filterCharacters, getCharactersPageByPageNumber} from "../../../api";
import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";


interface SearchCharactersProps {
    setCharacters: (data: ICharacterList) => void
}

const SearchCharacters: FC<SearchCharactersProps> = ({setCharacters}) => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const [pageNumber, setPageNumber] = useState<string | null>(searchParams.get('page'))
    const [name, setName] = useState<string>("")
    const [isDropDownShow, setIsDropDownShow] = useState<boolean>(false)
    const [selectedStatus, setSelectedStatus] = useState<string>()

    const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const getData = () => {
        if (setCharacters) {
            filterCharacters("?name=" + name).then(data => setCharacters(data))
        }
    }

    const radioHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsDropDownShow(!isDropDownShow)
        setSelectedStatus(e.currentTarget.id)
    }

    const putQueryParams = () => {
        navigate({
            search: createSearchParams({
                page: pageNumber ? pageNumber : "1",
                name: name,
                status: (selectedStatus && (selectedStatus !== "All")) ? selectedStatus : ""
            }).toString()
        })

    }

    useEffect(() => {
        setPageNumber(searchParams.get('page'))
    }, [searchParams])


    useEffect(() => {
        if (setCharacters) {
            if (name) {
                if (selectedStatus) {
                    if (selectedStatus !== "All") {
                        filterCharacters("?name=" + name + "&status=" + selectedStatus).then(data => setCharacters(data))
                    } else {
                        filterCharacters("?name=" + name).then(data => setCharacters(data))
                    }
                } else {
                    filterCharacters("?name=" + name).then(data => setCharacters(data))
                }
            } else {
                if (selectedStatus) {
                    if (selectedStatus !== "All") {
                        filterCharacters("?status=" + selectedStatus).then(data => setCharacters(data))
                    } else {
                        getCharactersPageByPageNumber("1").then(data => setCharacters(data))
                    }
                }
            }

            putQueryParams()
        }

    }, [name, selectedStatus])


    return (
        <>
            <div className="input-group mb-3">
                <div className="dropdown">
                    <button className="btn btn-outline-secondary dropdown-toggle " type="button"
                            style={{minWidth: "10rem"}}
                            data-bs-toggle="dropdown" aria-expanded="false"
                            onClick={() => setIsDropDownShow(!isDropDownShow)}>
                        {selectedStatus ? selectedStatus : "Life Status"}
                    </button>
                    <ul className={`dropdown-menu  ${isDropDownShow ? "d-block" : "d-none"}`}>
                        <li>
                            <div className="dropdown-item">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" value="" id="Dead"
                                           checked={"Dead" === selectedStatus}
                                           onChange={radioHandler}/>
                                    <label className="form-check-label" htmlFor="Dead">
                                        Dead
                                    </label>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="dropdown-item">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" value="" id="Alive"
                                           checked={"Alive" === selectedStatus}
                                           onChange={radioHandler}/>
                                    <label className="form-check-label" htmlFor="Alive">
                                        Alive
                                    </label>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="dropdown-item">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" value="" id="Unknown"
                                           checked={"Unknown" === selectedStatus}
                                           onChange={radioHandler}/>
                                    <label className="form-check-label" htmlFor="Unknown">
                                        Unknown
                                    </label>
                                </div>
                            </div>
                            <div className="dropdown-item">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" value="" id="All"
                                           checked={"All" === selectedStatus}
                                           onChange={radioHandler}/>
                                    <label className="form-check-label" htmlFor="All">
                                        All
                                    </label>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>


                <input type="text"
                       className="form-control"
                       placeholder="Search for character"
                       aria-label="Search for character"
                       aria-describedby="button-addon2"
                       value={name}
                       onChange={(e) => handleSearchValue(e)}
                />
                <button className="btn btn-primary" type="button" id="button-addon2" onClick={getData}>Find</button>
            </div>
        </>
    )
}

export default SearchCharacters