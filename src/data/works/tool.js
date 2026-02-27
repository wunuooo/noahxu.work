// src/data/works/tool.js

export const tool = {
    order: 2, // 该类别在 TabPage 组件中的排序位置
    data: [
        {
            id: 'project1',
            title: 'Grasshopper 插件',
            shortDescription: '为了解决设计课的问题而开发的一套简易小工具',
            thumbnail: '/assets/images/works/tool/project1.jpg',
            fullDetails: {
                description: '为了解决设计课的问题而开发的一套简易小工具，有助于更好地使用 Grasshopper。',
                date: '2024年3月',
                projectType: 'Grasshopper 二次开发',
                participants: ['Nuo'],
                images: [
                    '/assets/images/works/tool/project1/detail1.jpg',
                    '/assets/images/works/tool/project1/detail2.gif',
                    '/assets/images/works/tool/project1/detail3.gif',
                    '/assets/images/works/tool/project1/detail4.gif',
                    '/assets/images/works/tool/project1/detail5.gif',
                    '/assets/images/works/tool/project1/detail6.gif',
                    '/assets/images/works/tool/project1/detail7.gif',
                    '/assets/images/works/tool/project1/detail8.jpg',
                    '/assets/images/works/tool/project1/detail9.gif',
                    '/assets/images/works/tool/project1/detail10.gif',
                ]
            }
        },
        {
            id: 'project2',
            title: '元拓创新 MatGen',
            shortDescription: '一个利用 AI 快速生成活动宣传物料的在线工具。',
            thumbnail: '/assets/images/works/tool/project2.png', // 您可以替换为实际的缩略图路径
            fullDetails: {
                description: '这是一个基于AI的在线应用，可以根据用户输入的关键词和风格偏好，自动生成包括海报、社交媒体图片在内的全套活动宣传物料。该演示为重构项目。项目链接: <a href="https://github.com/wunuooo/AI-Material-Gen-Tool" target="_blank" rel="noopener noreferrer">https://github.com/wunuooo/AI-Material-Gen-Tool</a>',
                date: '2024年10月',
                projectType: 'AI 工具 | 在线应用',
                participants: ['Group of 元拓创新'],
                images: [
                    '/assets/images/works/tool/project2/detail1.png',
                    '/assets/images/works/tool/project2/detail2.png',
                    '/assets/images/works/tool/project2/detail3.png',
                    '/assets/images/works/tool/project2/detail4.png',
                    '/assets/images/works/tool/project2/detail5.png',
                    '/assets/images/works/tool/project2/detail6.png',// 您可以替换为实际的详情图片路径
                ]
            }
        },
        // 其他项目
    ]
};