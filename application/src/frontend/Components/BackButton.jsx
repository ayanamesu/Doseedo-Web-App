import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';

let historyStack = [];

const BackButton = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (historyStack.length === 0 || historyStack[historyStack.length - 1] !== location.pathname) {
            historyStack.push(location.pathname);
        }
    }, [location]);

    const handleBackClick = () => {
        // historyStack.pop();
        // if (historyStack.length > 0) {
        //     navigate(historyStack[historyStack.length - 1], { replace: true });
        // }
        window.history.go(-1);
    };

    if(location.pathname !== "/"){
        return (
            <FontAwesomeIcon onClick={handleBackClick} className="backButton" title="back" icon={faChevronCircleLeft} />
        );
    } else {
        return null;
    }
}

export default BackButton;