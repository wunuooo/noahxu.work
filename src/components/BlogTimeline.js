import React from 'react';

const BlogTimeline = ({ blogData, onTimelineClick }) => {
    // Group blogs by year
    const groupedByYear = blogData.reduce((acc, blog) => {
        const year = new Date(blog.date).getFullYear();
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(blog);
        return acc;
    }, {});

    // Sort years in descending order
    const sortedYears = Object.keys(groupedByYear).sort((a, b) => b - a);

    return (
        <div className="w-full h-full p-4">
            <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">文章归档</h3>
            <div className="relative border-l-2 border-gray-200 dark:border-gray-700">
                {sortedYears.map(year => (
                    <div key={year} className="mb-8 ml-6">
                        <div className="absolute -left-[11px] h-5 w-5 rounded-full bg-gray-300 dark:bg-gray-600 border-4 border-white dark:border-gray-900"></div>
                        <h4 className="text-xl font-bold text-black dark:text-white mb-2">{year}</h4>
                        <ul>
                            {groupedByYear[year].map(blog => (
                                <li key={blog.date} className="mb-2">
                                    <button 
                                        onClick={() => onTimelineClick(blog.date)}
                                        className="text-left text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
                                    >
                                        <span className="text-sm mr-2">{blog.date.substring(5)}</span>
                                        {blog.title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogTimeline;
