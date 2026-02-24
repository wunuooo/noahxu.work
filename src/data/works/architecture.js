// src/data/works/architecture.js

export const architecture = {
    order: 3, // 该类别在 TabPage 组件中的排序位置
    data: [
        {
            id: 'project1',
            title: '大学生山地运动俱乐部设计',
            shortDescription: '结合地形及周边人群流线的运动俱乐部建筑设计',
            thumbnail: '/assets/images/works/architecture/project1.jpg',
            fullDetails: {
                description: '（待补充）',
                date: '2021年11月',
                projectType: '公共建筑 | 体育建筑',
                participants: ['Nuo'],
                images: [
                    '/assets/images/works/architecture/project1/detail1.jpg',
                    '/assets/images/works/architecture/project1/detail2.jpg',
                ]
            }
        },
        {
            id: 'project2',
            title: '高层商业综合体设计',
            shortDescription: '结合中间层公共空间的高层商业综合体建筑设计',
            thumbnail: '/assets/images/works/architecture/project2.jpg',
            fullDetails: {
                description: '（待补充）',
                date: '2023年1月',
                projectType: '高层商业综合体',
                participants: ['Nuo', 'LQF'],
                images: [
                    '/assets/images/works/architecture/project2/detail1.jpg',
                    '/assets/images/works/architecture/project2/detail2.jpg',
                ]
            }
        },
        // 其他项目
    ]
};