// src/components/Works.js
import React, { useEffect, useState } from 'react';
import TabPage from '../components/TabPage';
import { useParams } from 'react-router-dom';
import { WorkData } from '../data/WorkData'; // 导入共享的工作数据

const Works = () => {
    const { category } = useParams();
    const [currentCategory, setCurrentCategory] = useState(null);

    useEffect(() => {
        // 如果没有指定category，默认使用第一个分类
        if (!category && Object.keys(WorkData).length > 0) {
            const firstCategory = Object.keys(WorkData)[0];
            setCurrentCategory(firstCategory);
        } else {
            setCurrentCategory(category);
        }
    }, [category]);

    // 如果还没有确定分类，不渲染
    if (!currentCategory) return null;

    return (
        <TabPage
            category="works"
            activeCategory={currentCategory}
            data={WorkData}
        />
    );
};

export default Works;
