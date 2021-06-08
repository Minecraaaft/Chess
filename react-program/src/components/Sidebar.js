import React from 'react'
import MenuButton from './MenuButton'

const Sidebar = () => {
    const onClick = () => {
        console.log('click');
    }

    return (
        <div className="sidebar">
            <img src="/../assets/chess_logo.png" alt="chess logo" className="logo" />
            <MenuButton onClick = {onClick} text = 'Home' iconName="home" />
            <MenuButton onClick = {onClick} text = 'Practice' iconName="trending_up" />
            <MenuButton onClick = {onClick} text = 'Analysis' iconName="equalizer" />
            <MenuButton onClick = {onClick} text = 'Your archieve' iconName="folder" />
        </div>
    )
}

export default Sidebar
