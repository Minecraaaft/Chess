import React from 'react'

const Tile = ({ color, position, image, moved, check }) => {
    let clasName = color + " tile " + position;
    if (moved) {
        clasName += " moved"
    }

    if (check) {
        clasName += " check"
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
