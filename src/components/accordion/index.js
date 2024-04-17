import React, { useEffect, useRef, useState } from 'react';
import './style.css'

const Accordion = ({ badge, title, links, isExpanded }) => {
    const [isActive, setIsActive] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        setIsActive(isExpanded);
    }, [isExpanded]);

    const toggleAccordion = () => {
        setIsActive(!isActive);
    }

    return (
        <li className={`accordion-item ${isActive ? 'active' : ''}`}>
            <div className="accordion-title" onClick={toggleAccordion}>
                <h2 className="accordion-title-text"><span className="badge">{badge}</span>{title}</h2>
                <span className={`accordion-icon ${isActive ? 'active' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-expanded={isActive}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </span>
            </div>
            <div className={`accordion-content ${isActive ? 'active' : ''}`} 
                style={{ maxHeight: isActive ? contentRef.current.scrollHeight + "px" : "0" }}>
                <ul className="accordion-links" ref={contentRef}>
                    {links.map((link, index) => (
                        <li key={index} className={`accordion-link ${link.classname}`}>
                            <a href={link.url} target="_blank" rel="noreferrer">{link.text}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </li>
    );
};

export default Accordion;
