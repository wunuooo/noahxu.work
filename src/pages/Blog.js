// src/pages/Blog.js

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { BlogData } from '../data/BlogData';

// const Blog = () => {
//     return (
//         <div className="container mx-auto my-8 p-4 main_content max-w-4xl">

//             <div className="space-y-6">
//                 {BlogData.map((post) => (
//                     <Link
//                         to={`/blog/${post.id}`}
//                         key={post.id}
//                         className="block"
//                     >
//                         <div className="bg-white border p-6 mb-6 rounded-lg transition-all duration-300 hover:shadow-xl">
//                             <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
//                             <div className="text-gray-500 mb-4">
//                                 <span className="mr-4">发布日期：{post.date}</span>
//                                 <div className="inline-flex space-x-2">
//                                     {post.tags.map((tag, index) => (
//                                         <span
//                                             key={index}
//                                             className="bg-black text-white text-xs font-medium px-2.5 py-0.5 rounded"
//                                         >
//                                             {tag}
//                                         </span>
//                                     ))}
//                                 </div>
//                             </div>

//                             <div className="text-gray-700 leading-relaxed">
//                                 {typeof post.content === 'function' ? post.content() : post.content}
//                             </div>
//                         </div>
//                     </Link>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Blog;

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { BlogData } from '../data/BlogData';

// const Blog = () => {
//     const [blogData, setBlogData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const loadBlogs = async () => {
//             const data = await BlogData();
//             setBlogData(data);
//             setLoading(false);
//         };
//         loadBlogs();
//     }, []);

//     if (loading) {
//         return <div>加载中...</div>;
//     }

//     return (
//         <div className="container mx-auto my-8 p-4 main_content max-w-4xl">
//             <div className="space-y-6">
//                 {blogData.map((post) => (
//                     <Link
//                         to={`/blog/${post.date}`}
//                         key={post.date}
//                         className="block"
//                     >
//                         <div className="bg-white border p-6 mb-6 rounded-lg transition-all duration-300 hover:shadow-xl">
//                             <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
//                             <div className="text-gray-500 mb-4">
//                                 <span className="mr-4">发布日期：{post.date}</span>
//                                 <div className="inline-flex space-x-2">
//                                     {post.tags.map((tag, index) => (
//                                         <span
//                                             key={index}
//                                             className="bg-black text-white text-xs font-medium px-2.5 py-0.5 rounded"
//                                         >
//                                             {tag}
//                                         </span>
//                                     ))}
//                                 </div>
//                             </div>
//                             <div className="text-gray-700 leading-relaxed">
//                                 <p>{post.content[0]}</p>
//                             </div>
//                         </div>
//                     </Link>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Blog;

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { BlogData } from '../data/BlogData';

// const Blog = () => {
//     const [blogData, setBlogData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const loadBlogs = async () => {
//             const data = await BlogData();
//             setBlogData(data);
//             setLoading(false);
//         };
//         loadBlogs();
//     }, []);

//     if (loading) {
//         return <div>加载中...</div>;
//     }

//     return (
//         <div className="container mx-auto my-8 p-4 main_content max-w-4xl">
//             <div className="space-y-6">
//                 {blogData.map((post) => (
//                     <Link to={`/blog/${post.date}`} key={post.date} state={{ post }} className="block">
//                         <div className="bg-white border p-6 mb-6 rounded-lg transition-all duration-300 hover:shadow-xl">
//                             <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
//                             <div className="text-gray-500 mb-4">
//                                 <span className="mr-4">发布日期：{post.date}</span>
//                                 <div className="inline-flex space-x-2">
//                                     {post.tags.map((tag, index) => (
//                                         <span
//                                             key={index}
//                                             className="bg-black text-white text-xs font-medium px-2.5 py-0.5 rounded"
//                                         >
//                                             {tag}
//                                         </span>
//                                     ))}
//                                 </div>
//                             </div>
//                             <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />
//                         </div>
//                     </Link>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Blog;

import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BlogData } from '../data/BlogData';
import BlogTimeline from '../components/BlogTimeline'; // Import the new component

const Blog = () => {
    const [blogData, setBlogData] = useState([]);
    const [loading, setLoading] = useState(true);
    const postRefs = useRef({});

    useEffect(() => {
        const loadBlogs = async () => {
            const data = await BlogData();
            setBlogData(data);
            setLoading(false);
            // Initialize refs for each post
            data.forEach(post => {
                postRefs.current[post.date] = React.createRef();
            });
        };
        loadBlogs();
    }, []);

    const handleTimelineClick = (date) => {
        const postElement = postRefs.current[date]?.current;

        postElement?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        if (postElement) {
            postElement.classList.add('shadow-xl', 'dark:shadow-lg', 'dark:shadow-white/10');
            setTimeout(() => {
                postElement.classList.remove('shadow-xl', 'dark:shadow-lg', 'dark:shadow-white/10');
            }, 1500);
        }
    };

    // if (loading) {
    //     return <div>加载中...</div>;
    // }

    return (
        <div className="container mx-auto my-8 p-4 main_content">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left: Blog List */}
                <div className="w-full md:w-2/3 space-y-6">
                    {blogData.map((post) => (
                        <div key={post.date}>
                            <Link to={`/blog/${post.date}`} state={{ post }} className="block">
                                <div ref={postRefs.current[post.date]} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-lg transition-all duration-300 hover:shadow-xl dark:hover:shadow-lg dark:hover:shadow-white/10">
                                    <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">{post.title}</h2>
                                    <div className="text-gray-500 dark:text-gray-400 mb-4 text-sm">
                                        <span className="mr-4">发布日期：{post.date}</span>
                                        <div className="inline-flex space-x-2">
                                            {post.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed truncate">{post.content.replace(/<[^>]+>/g, '')}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Right: Timeline (hidden on small screens) */}
                <div className="hidden md:block md:w-1/3 sticky top-24 self-start">
                    <BlogTimeline blogData={blogData} onTimelineClick={handleTimelineClick} />
                </div>
            </div>
        </div>
    );
};

export default Blog;
