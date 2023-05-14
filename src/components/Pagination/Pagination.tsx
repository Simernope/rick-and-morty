import {FC, useEffect, useState} from "react";
import {IListInfo} from "../../types/types";
import styles from './Pagination.module.scss'
import {NavLink, useLocation} from "react-router-dom";

interface PaginationProps {
    pagination: IListInfo
}

const Pagination: FC<PaginationProps> = ({pagination}) => {
    const [queryLink, setQueryLink] = useState<string>()
    const [currentPage, setCurrentPage] = useState<number>()
    const {search} = useLocation()

    //search.split('&').find(el => el.indexOf("page")).split('=')[1]

    useEffect(() => {
        setQueryLink(search.split("&").find(item => item.indexOf("page")))
        if (queryLink) {
            setCurrentPage(parseInt(queryLink.split('=')[1]))
        }
    }, [search, queryLink, currentPage])


    return (
        <>
            {
                pagination &&
                <nav aria-label="...">
                    <ul className={`pagination ${styles.pagination}`}>

                        {
                            pagination.prev && currentPage ?
                                <>
                                    <li className="page-item ">
                                        <NavLink className="page-link"
                                              to={`?page=${currentPage - 1}`}
                                              aria-disabled="false">Previous</NavLink>
                                    </li>
                                    <li className="page-item">
                                        <NavLink className="page-link"
                                              to={`?page=${currentPage - 1}`}
                                              aria-disabled="false">{currentPage - 1}</NavLink>
                                    </li>
                                </>

                                :
                                <li className="page-item disabled">
                                    <NavLink className="page-link" to={'/'} aria-disabled="true">Previous</NavLink>
                                </li>
                        }
                        {
                            currentPage &&
                            <li className="page-item active">
                                <NavLink className="page-link"
                                      to={`?page=${currentPage}`}
                                      aria-disabled="false">{currentPage}</NavLink>
                            </li>

                        }

                        {
                            pagination.next && currentPage ?
                                <>
                                    <li className="page-item ">
                                        <NavLink className="page-link"
                                              to={`?page=${currentPage + 1}`}
                                              aria-disabled="false">{currentPage + 1}</NavLink>
                                    </li>
                                    <li className="page-item ">
                                        <NavLink className="page-link"
                                              to={`?page=${currentPage + 1}`}
                                              aria-disabled="false">Next</NavLink>
                                    </li>
                                </>

                                :
                                <li className="page-item disabled">
                                    <NavLink className="page-link" to={'/'} aria-disabled="true">Next</NavLink>
                                </li>
                        }

                    </ul>
                </nav>
            }

        </>

    )
}

export default Pagination