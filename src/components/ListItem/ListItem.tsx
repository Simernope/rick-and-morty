import React from "react";
import Preloader from "../Preloader/Preloader";
import styles from './ListItem.module.scss'

interface ListItemProps<T> {
    items: T[]
    renderItem: (item: T) => React.ReactNode
}

function ListItem<T>({items, renderItem}: ListItemProps<T>) {
    return (
        <div className={styles.contentList}>
            {items.length ?
                <>
                    {
                        items.map(renderItem)
                    }
                </>
                :
                <Preloader/>
            }

        </div>
    )
}

export default ListItem