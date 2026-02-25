const fs = require('fs');
const path = require('path');

const blogsDirectory = path.join(__dirname, '..', 'public', 'assets', 'blogs');
const indexFilePath = path.join(blogsDirectory, 'index.json');

try {
    // 读取目录下的所有文件名
    const files = fs.readdirSync(blogsDirectory);

    // 过滤出 .html 文件，并排除 template.html
    const blogFiles = files
        .filter(file => file.endsWith('.html') && file !== 'template.html')
        // 可选：按文件名（日期）降序排序
        .sort((a, b) => {
            // 假设文件名为 YYYY-MM-DD.html 格式，如果不是，则不排序
            const dateA = new Date(a.replace('.html', ''));
            const dateB = new Date(b.replace('.html', ''));
            // 如果日期有效，则进行比较
            if (!isNaN(dateA) && !isNaN(dateB)) {
                return dateB - dateA;
            }
            return 0; // 对于非日期格式的文件名，保持原有顺序
        });

    // 将文件名数组写入 index.json
    fs.writeFileSync(indexFilePath, JSON.stringify(blogFiles, null, 4));

    console.log('✅ Blog index generated successfully!');
    console.log(`Found ${blogFiles.length} blog posts.`);

} catch (error) {
    console.error('❌ Error generating blog index:', error);
    process.exit(1); // 以错误码退出进程
}
