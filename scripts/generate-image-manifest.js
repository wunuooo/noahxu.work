
const fs = require('fs');
const path = require('path');

const worksDir = path.join(__dirname, '../public/assets/images/works');
const manifestPath = path.join(worksDir, 'manifest.json');

const imageManifest = {};

// Scan all categories (gamedev, tool, etc.)
fs.readdirSync(worksDir, { withFileTypes: true }).forEach(category => {
    if (category.isDirectory()) {
        const categoryPath = path.join(worksDir, category.name);
        
        // Scan all projects within the category
        fs.readdirSync(categoryPath, { withFileTypes: true }).forEach(project => {
            if (project.isDirectory()) {
                const projectPath = path.join(categoryPath, project.name);
                const imageFiles = fs.readdirSync(projectPath).filter(file => 
                    !file.endsWith('.json') && // Exclude manifest itself if it's somehow here
                    (file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.gif') || file.endsWith('.jpeg'))
                );
                
                // The key is in 'category/projectId' format
                // Natural sort to handle '2.jpg' vs '10.jpg' correctly
                const sortedImageFiles = imageFiles.sort((a, b) => {
                    const numA = parseInt(a.match(/^\d+/)?.[0] || a, 10);
                    const numB = parseInt(b.match(/^\d+/)?.[0] || b, 10);
                    return numA - numB;
                });

                const manifestKey = `${category.name}/${project.name}`;
                imageManifest[manifestKey] = sortedImageFiles; // Store the sorted list of filenames
            }
        });
    }
});

// Write the manifest file
fs.writeFileSync(manifestPath, JSON.stringify(imageManifest, null, 2));

console.log('Image manifest generated successfully at', manifestPath);
