import React from 'react'

function Logo({ width = "100px" }) {
    return (
        <img
            src="/image.png"
            alt="Blog Logo"
            style={{ width }}
            className="mx-auto object-contain"
        />
    )
}

export default Logo