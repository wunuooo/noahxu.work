// src/components/BlogDetail.js

// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { BlogData } from '../data/BlogData';

// const BlogDetail = () => {
//     const { id } = useParams();
//     const blog = BlogData.find(item => item.id === id);

//     if (!blog) {
//         return <div>未找到该博客</div>;
//     }

//     return (
//         <div className="container mx-auto my-8 p-4 main_content max-w-4xl">
//             <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
//             <div className="text-gray-500 mb-4">
//                 <span className="mr-4">发布日期：{blog.date}</span>
//                 <div className="inline-flex space-x-2">
//                     {blog.tags.map((tag, index) => (
//                         <span
//                             key={index}
//                             className="bg-black text-white text-xs font-medium px-2.5 py-0.5 rounded"
//                         >
//                             {tag}
//                         </span>
//                     ))}
//                 </div>
//             </div>
//             <div className="text-gray-700 leading-relaxed">
//                 {typeof blog.content === 'function' ? blog.content() : blog.content}
//             </div>
//         </div>
//     );
// };

// export default BlogDetail;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { BlogData } from '../data/BlogData';

// const BlogDetail = () => {
//     const { id } = useParams();
//     const [blog, setBlog] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const loadBlog = async () => {
//             const data = await BlogData();
//             const matchedBlog = data.find((item) => item.date === id);
//             setBlog(matchedBlog);
//             setLoading(false);
//         };
//         loadBlog();
//     }, [id]);

//     if (loading) {
//         return <div>加载中...</div>;
//     }

//     if (!blog) {
//         return <div>未找到该博客</div>;
//     }

//     return (
//         <div className="container mx-auto my-8 p-4 main_content max-w-4xl">
//             <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
//             <div className="text-gray-500 mb-4">
//                 <span className="mr-4">发布日期：{blog.date}</span>
//                 <div className="inline-flex space-x-2">
//                     {blog.tags.map((tag, index) => (
//                         <span
//                             key={index}
//                             className="bg-black text-white text-xs font-medium px-2.5 py-0.5 rounded"
//                         >
//                             {tag}
//                         </span>
//                     ))}
//                 </div>
//             </div>
//             <div className="text-gray-700 leading-relaxed">
//                 {blog.content.map((paragraph, index) => (
//                     <p key={index} className="mb-1">
//                         {paragraph}
//                     </p>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default BlogDetail;

import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'react-feather';
import { BlogData } from '../data/BlogData';

const BlogDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [blog, setBlog] = useState(null);
    const [prevBlog, setPrevBlog] = useState(null);
    const [nextBlog, setNextBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // If we have blog data from the location state, use it immediately
        // to prevent flicker. Then, load the full list for nav.
        if (location.state?.post) {
            setBlog(location.state.post);
            setLoading(false);
        } else {
            // If no state, we must show loading until we fetch.
            setLoading(true);
        }

        const loadNavData = async () => {
            const data = await BlogData();
            const currentIndex = data.findIndex(item => item.date === id);

            if (currentIndex === -1) {
                if (!location.state?.post) setLoading(false); // Stop loading if we fetched
                return;
            }

            // If the blog wasn't passed in state, set it now.
            if (!location.state?.post) {
                setBlog(data[currentIndex]);
                setLoading(false);
            }

            setPrevBlog(currentIndex > 0 ? data[currentIndex - 1] : null);
            setNextBlog(currentIndex < data.length - 1 ? data[currentIndex + 1] : null);
        };

        loadNavData();

    }, [id, location.state]); // Rerun when we navigate to a new blog post

    const handleBack = () => {
        navigate('/blog');
    };

    if (loading) {
        return <div></div>;
    }

    if (!blog) {
        return <div>未找到该博客</div>;
    }

    return (
        <div className="container mx-auto my-8 p-4 main_content max-w-4xl">
            {/* Back Button & Title */}
            <div className="flex items-center gap-4 mb-8">
                <button onClick={handleBack} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-3xl font-bold text-black dark:text-white">{blog.title}</h1>
            </div>
            <div className="text-gray-500 dark:text-gray-400 mb-4 text-sm">
                <span className="mr-4">发布日期：{blog.date}</span>
                <div className="inline-flex space-x-2">
                    {blog.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content }} />

            {/* Bottom Prev/Next Navigation */}
            <div className="flex justify-between mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div>
                    {prevBlog && (
                        <Link to={`/blog/${prevBlog.date}`} state={{ post: prevBlog }} className="block text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200">
                            <div className="text-sm mb-1">上一篇</div>
                            <div className="font-semibold text-black dark:text-white truncate max-w-xs">{prevBlog.title}</div>
                        </Link>
                    )}
                </div>
                <div className="text-right">
                    {nextBlog && (
                        <Link to={`/blog/${nextBlog.date}`} state={{ post: nextBlog }} className="block text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200">
                             <div className="text-sm mb-1">下一篇</div>
                            <div className="font-semibold text-black dark:text-white truncate max-w-xs">{nextBlog.title}</div>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
