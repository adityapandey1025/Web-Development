import "./card.css";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

import useTheme from "../context/ThemeContext";

function Card() {
    const {themeMode}=useTheme();
    
    return (
        <div className="main">

            <div className={`card ${themeMode}`} >

                <img src="course.avif" alt="" />

                <h3>
                    Apple Watch Series 7 GPS,
                    Aluminium Case,
                    Starlight Sport
                </h3>

                <div className="rating">

                    <div className="star">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStarHalfAlt />
                    </div>

                    <div className="starNum">
                        4.5
                    </div>

                </div>

                <div className="bottom">

                    <div className="price">

                        $599

                    </div>

                    <div className="button">

                        Add to cart

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Card;