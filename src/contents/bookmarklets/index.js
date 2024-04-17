import React, { useEffect, useState } from 'react';
import List from 'components/list';
import Download from 'components/download';
import json from 'data/safariScript.json';
import Footer from 'components/footer';
import './style.css'

const Bookmarklets = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [filteredData, setFilteredData] = useState([]);
    const [selectedBookmarklets, setSelectedBookmarklets] = useState([]);

    const showTab = (tabName) => {
        setActiveTab(tabName);
    };

    const handleCheckbox = (selectedBookmarklet) => {
		const updatedBookmarklets = selectedBookmarklets.includes(selectedBookmarklet)
        ? selectedBookmarklets.filter((bookmarklet) => bookmarklet !== selectedBookmarklet)
        : [...selectedBookmarklets, selectedBookmarklet];
        setSelectedBookmarklets(updatedBookmarklets);
	};

    useEffect(() => {
        if (activeTab === 'all') {
            setFilteredData(json);
        } else {
            setFilteredData(json.filter((item) => item.classname.includes(activeTab)));
        }
    }, [activeTab]);  

    return (
        <section className="bookmarklets content">
            <div className="bookmarklet-buttons">
                <div id="tabMenu">
                    <button onClick={() => showTab('all')} className={`tab-all ${activeTab === 'all' ? 'active' : ''}`}>ALL</button>
                    <button onClick={() => showTab('dev')} className={`tab-dev ${activeTab === 'dev' ? 'active' : ''}`}>DEV</button>
                    <button onClick={() => showTab('gp')} className={`tab-gp ${activeTab === 'gp' ? 'active' : ''}`}>GP</button>
                    <button onClick={() => showTab('pm')} className={`tab-pm ${activeTab === 'pm' ? 'active' : ''}`}>PM</button>
                    <button onClick={() => showTab('qa')} className={`tab-qa ${activeTab === 'qa' ? 'active' : ''}`}>QA</button>
                </div>
                <div className="download-buttons">
                    <Download selectedBookmarklets={selectedBookmarklets} />
                </div>
            </div>
            <ul id="itemList" className="tab-content">
                {filteredData.map((item, key) => (
                    <List key={key} data={item} handleCheckbox={handleCheckbox} selectedBookmarklets={selectedBookmarklets} />
                ))}  
            </ul>
            <Footer />
        </section>
    );
};

export default Bookmarklets;
