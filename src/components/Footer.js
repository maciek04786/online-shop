import React from 'react'

// css
import "./Footer.css"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <div>
            <footer>
                <p>&copy; Copyright {currentYear}: Maciej Sikora</p>
            </footer>
        </div>
    )
}
