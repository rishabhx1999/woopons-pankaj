import React, { useState } from 'react';
import './style.scss';

const Toggle = ({ toggled, onClick, cancelSub }) => {
    const [isToggled, toggle] = useState(toggled)

    const callback = () => {
        if (cancelSub) {
            if (isToggled) {
                event.preventDefault()
            } else {
                toggle(!isToggled)
                onClick()
            }
        } else {
            console.log('else')
            toggle(!isToggled)
            onClick()
        }
        
    }

    return (
        <label className="toggle-main-div">
            <input type="checkbox" defaultChecked={isToggled} onClick={callback} />
            <span />
        </label>
    )
}

export default Toggle;