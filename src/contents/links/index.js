import { useEffect, useState } from "react";
import Accordion from "components/accordion";
import json from 'data/marcomLink.json';
import './style.css'

const Links = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [isExpanded, setIsExpanded] = useState(false);
    const [filteredData, setFilteredData] = useState([]);

    const showTab = (tabName) => {
        setActiveTab(tabName);
    };

    useEffect(() => {
        if (activeTab === 'all') {
            setFilteredData(json);
        } else {
            setFilteredData(json.filter((item) => item.classname.includes(activeTab)));
        }
    }, [activeTab]);

    const toggleAllAccordions = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <section className="links content">
            <div className="links-buttons">
                <div id="tabMenu">
                    <button onClick={() => showTab('all')} className={`tab-all ${activeTab === 'all' ? 'active' : ''}`}>ALL</button>
                    <button onClick={() => showTab('dev')} className={`tab-dev ${activeTab === 'dev' ? 'active' : ''}`}>DEV</button>
                    <button onClick={() => showTab('gp')} className={`tab-gp ${activeTab === 'gp' ? 'active' : ''}`}>GP</button>
                    <button onClick={() => showTab('pm')} className={`tab-pm ${activeTab === 'pm' ? 'active' : ''}`}>PM</button>
                    <button onClick={() => showTab('qa')} className={`tab-qa ${activeTab === 'qa' ? 'active' : ''}`}>QA</button>
                </div>
                <button onClick={toggleAllAccordions} className="expand-all">
                    {isExpanded ? 'Close All' : 'Expand All'}
                </button>
            </div>
            <ul className="accordion">
                {filteredData.map((item, index) => (
                    <Accordion key={index} title={item.title} links={item.links} badge={item.badge} isExpanded={isExpanded} />
                ))}
            </ul>
        </section>
    )
}

export default Links;