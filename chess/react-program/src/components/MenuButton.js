import React from 'react'
import PropTypes from 'prop-types'

const MenuButton = ({text, onClick, iconName}) => {
    

    return (
        <div className="sidebarOption" onClick={onClick}>
            <span className="material-icons">{iconName}</span>
            <p>{text}</p>
        </div>
    )
}

MenuButton.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}

export default MenuButton
