// src/components/TabPage.js

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const categoryNames = {
    'architecture': '建筑设计',
    'craft': '实体搭建',
    'gamedev': '游戏制作',
    'photo': '影像纪实',
    'tool': '工具开发',
    'others': '其它项目',
};

const TabPage = ({ category, data, activeCategory }) => {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState(activeCategory);
    const [imageManifest, setImageManifest] = useState(null);

    useEffect(() => {
        // Fetch the generated image manifest
        fetch('/assets/images/works/manifest.json')
            .then(response => response.json())
            .then(data => setImageManifest(data))
            .catch(error => console.error('Error fetching image manifest:', error));
    }, []);

    useEffect(() => {
        setSelectedTab(activeCategory);
    }, [activeCategory]);

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
        navigate(`/${category}/${tab}`);
    };

    // 如果没有数据，返回空
    if (!data[selectedTab]) return null;

    return (
        <div className="container mx-auto my-8 p-4 main_content">
            <div className="flex border-b mb-4 overflow-x-auto whitespace-nowrap">
                {Object.keys(data).map(tab => (
                    <button
                        key={tab}
                        onClick={() => handleTabChange(tab)}
                        className={`px-4 py-2 transition-colors duration-200 ${selectedTab === tab
                            ? 'border-b-2 border-black text-black dark:border-white dark:text-white'
                            : 'text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white'}`}
                    >
                        {categoryNames[tab] || tab}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data[selectedTab].map(item => {
                    const manifestKey = `${selectedTab}/${item.id}`;
                    const thumbnailFile = imageManifest && imageManifest[manifestKey]?.[0];
                    const thumbnailUrl = thumbnailFile 
                        ? `/assets/images/works/${selectedTab}/${item.id}/${thumbnailFile}` 
                        : '/assets/images/placeholder.png'; // Fallback image

                    return (
                        <Link
                            to={`/${category}/${selectedTab}/${item.id}`}
                            key={item.id}
                            className="block border rounded-lg p-4 duration-300 hover:shadow-xl dark:hover:shadow-lg dark:hover:shadow-white/25"
                        >
                            <img
                                src={thumbnailUrl}
                                alt={item.title}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <div className="p-2">
                                <h3 className="text-base md:text-lg font-bold text-black dark:text-white">{item.title}</h3>
                                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">{item.shortDescription}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default TabPage;