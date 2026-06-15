import { useState } from "react";
import "./toggle.css";

import useTheme from "../context/ThemeContext";

function Toggle() {
    
    const {themeMode,lightTheme,darkTheme}=useTheme();

    return (
        <div className="toggle">

            <input
                type="checkbox"
                id="theme"
                checked={themeMode==='dark'}
                onChange={()=>{
                    if(themeMode==='light'){
                        darkTheme()
                    }
                    else{
                        lightTheme();
                    }
                }}
            />

            <label htmlFor="theme">Toggle</label>

        </div>
    );
}

export default Toggle;