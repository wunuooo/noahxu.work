// src/data/works/tool.js

export const tool = {
    order: 2, // 该类别在 TabPage 组件中的排序位置
    data: [

        {
            id: 'project2',
            title: 'MatGen | 活动物料一站式生成应用',
            shortDescription: '一个利用AI快速生成活动宣传物料的在线工具。',
            fullDetails: {
                description: '这是一个基于AI的在线应用，可以根据用户输入的关键词和风格偏好，自动生成包括海报、社交媒体图片在内的全套活动宣传物料。该演示为重构项目。',
                date: '2025.01',
                projectType: 'AI 工具 | 在线应用',
                participants: 'Group of 元拓创新',
                link: 'https://github.com/wunuooo/MatGen',
                // images array is no longer needed, it will be generated automatically
            }
        },
        {
            id: 'project3',
            title: 'Shafer | 女性安全守护 App',
            shortDescription: '一款集即时响应、安全路线规划和社区互助为一体的女性安全应用。',
            fullDetails: {
                description: 'Shafer是一款多功能女性安全手机 App。<br><br>其核心功能包括：<br>1. <strong>即时响应与SOS</strong>：在紧急情况下，用户可通过一键SOS功能，迅速通知紧急联系人和附近的用户。<br>2. <strong>安全路线规划</strong>：基于实时数据和社区反馈，为用户规划出夜晚更安全、光照更好的出行路线。<br>3. <strong>互助社区平台</strong>：用户可以在平台上分享安全资讯、报告可疑活动、形成一个互相支持和守护的社区网络。',
                date: '2024.10',
                projectType: '移动应用 (App) | UI/UX 设计',
                participants: 'Group of 人机交互小组',
                link: 'https://github.com/wunuooo/shafer',
                // images array is no longer needed, it will be generated automatically
            }
        },
        {
            id: 'project4',
            title: 'Image Edges Cropper | 图片白边裁剪工具',
            shortDescription: '快速批量地将图片四周白边/透明边缘裁剪的工具。',
            fullDetails: {
                description: '快速批量地将图片四周白边/透明边缘裁剪的工具。',
                date: '2024.04',
                projectType: 'PYQT 应用开发',
                participants: 'Nuo',
                link: 'https://github.com/wunuooo/ImageEdgesCropper',
                // images array is no longer needed, it will be generated automatically
            }
        },
        {
            id: 'project1',
            title: 'CSU Archi Tool | Grasshopper功能扩展插件',
            shortDescription: '为了解决设计课的问题而开发的一套简易小工具',
            fullDetails: {
                description: '为了解决设计课的问题而开发的一套简易小工具，有助于更好地使用 Grasshopper。',
                date: '2024.03',
                projectType: 'Grasshopper 二次开发',
                participants: 'Nuo',
                link: 'https://github.com/wunuooo/CapableArchiTool',
                // images array is no longer needed, it will be generated automatically
            }
        },
        // 其他项目
    ]
};