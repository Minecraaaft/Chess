import React from 'react'

const Tile = ({ color, position, image, moved, check, marked }) => {
    let clasName = color + " tile " + position;
    if (moved) {
        clasName += " moved"
    }

    if (check) {
        clasName += " check"
    }

    if (marked) {
        clasName += " marked"
    }

    if (image !== undefined) {
        return (<div className={clasName}>
            <div style={{ backgroundImage: `url(${image})` }} className={"piece"} id={position}></div>
        </div>)
    } else {
        return <div className={clasName}></div>
    }


}

export default Tile
