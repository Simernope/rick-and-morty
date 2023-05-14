import {FC} from "react";
import {NavLink} from "react-router-dom";
import styles from './Navbar.module.scss'

const Navbar: FC = () => {
    return (
        <nav className={`${styles.nav} navbar navbar-expand-lg navbar-light bg-light p-0`}>
            <div className="container-fluid">
                <h5 className="title fs-4">
                    <NavLink to="/" className={styles.link}>
                        Rick and morty api
                    </NavLink>

                </h5>
                <div className="d-flex justify-content-end flex-column justify-content-center align-items-end">
                    <div>Simernope project</div>
                    <NavLink to="/" className={styles.link}>
                        <strong>REPO</strong>
                    </NavLink>

                </div>

            </div>
        </nav>
    )
}

export default Navbar