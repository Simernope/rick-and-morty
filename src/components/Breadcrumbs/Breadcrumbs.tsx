import {FC} from "react";
import {Link, useNavigate} from "react-router-dom";

interface BreadcrumbsProps {
    name: string
    id: number
    prevPageTitle: string

}

const Breadcrumbs: FC<BreadcrumbsProps> = ({name, id, prevPageTitle}) => {
    const navigate = useNavigate()
    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    {
                        prevPageTitle &&
                        <div onClick={() => navigate(-1)}
                             className="breadcrumb-item active"
                             role="button">{prevPageTitle}</div>
                    }
                    <Link to={`/character/${id}`} className="breadcrumb-item active">{name}</Link>
                </ol>
            </nav>
        </>

    )
}

export default Breadcrumbs