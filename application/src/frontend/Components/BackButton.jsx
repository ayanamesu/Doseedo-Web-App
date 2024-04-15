import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';

const BackButton = () => {
    const handleBackClick = () => {
        window.history.go(-1);
    };

    return (
        <FontAwesomeIcon onClick={handleBackClick} className="backButton" title="back" icon={faChevronCircleLeft} />
    );
};

export default BackButton;