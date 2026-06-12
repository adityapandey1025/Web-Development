import React from 'react'
import { Link ,NavLink} from 'react-router-dom'

function Header() {
    return (
        <div>
            <div className="nav" style={{display:'flex', justifyContent:'space-around'}}>
                <NavLink to='/'
                className={({isActive})=>isActive?"active" : "inactive"}
                >Home</NavLink>
                <NavLink to='/about'  className={({isActive})=>isActive?"active" : "inactive"}>About</NavLink>
                <NavLink to='/contact'  className={({isActive})=>isActive?"active" : "inactive"}>Contact</NavLink>
            </div>
        </div>
    )
}

export default Header;
