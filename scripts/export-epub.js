#!/usr/bin/env node

/**
 * Script to export Docusaurus documentation to EPUB format
 * 
 * This script reads all markdown files from the docs directory,
 * converts them to HTML using marked, and generates an EPUB file.
 */

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const Epub = require('epub-gen');

// Configuration
const DOCS_DIR = path.join(__dirname, '..', 'docs');
const OUTPUT_DIR = path.join(__dirname, '..', 'static', 'books');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'Nghị_Lực_Phạm_Ngọc_Khuê.epub');
const COVER_IMAGE = path.join(__dirname, '..', 'static', 'img', 'bia.png');

// Book metadata
const bookMetadata = {
  title: 'Nghị Lực',
  author: 'Phạm Ngọc Khuê',
  publisher: 'Nhà Xuất Bản Hàn Thuyên',
  language: 'vi',
  description: 'NGHỊ LỰC CỦA P. N. KHUÊ, IN XONG TẠI NHÀ IN HÀN-THUYẾN, NGÀY 30-4-42',
  cover: fs.existsSync(COVER_IMAGE) ? COVER_IMAGE : undefined,
};

// Configure marked for better HTML output
marked.setOptions({
  gfm: true,
  breaks: true,
});

// Extract title from frontmatter or content
function extractTitle(content, filePath) {
  // Try to extract from frontmatter
  const frontmatterMatch = content.match(/^---[\s\S]*?title:\s*(.+?)[\n\r]/);
  if (frontmatterMatch) {
    return frontmatterMatch[1].trim().replace(/['"]/g, '');
  }
  
  // Try to extract from first heading
  const headingMatch = content.match(/^#\s+(.+?)$/m);
  if (headingMatch) {
    return headingMatch[1].trim();
  }
  
  // Fallback to filename
  return path.basename(filePath, '.md');
}

// Get all markdown files in order (respecting directory structure)
function getAllMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  // Sort files: directories first, then files, both alphabetically
  files.sort((a, b) => {
    if (a.isDirectory() && !b.isDirectory()) return -1;
    if (!a.isDirectory() && b.isDirectory()) return 1;
    return a.name.localeCompare(b.name);
  });
  
  files.forEach(file => {
    const filePath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      getAllMarkdownFiles(filePath, fileList);
    } else if (file.name.endsWith('.md')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Read and process markdown files
function processMarkdownFiles() {
  const files = getAllMarkdownFiles(DOCS_DIR);
  const chapters = [];
  
  files.forEach(filePath => {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Remove frontmatter
      let markdown = content.replace(/^---[\s\S]*?---\n/, '');
      
      // Convert markdown to HTML
      const html = marked.parse(markdown);
      
      // Extract title
      const title = extractTitle(content, filePath);
      
      chapters.push({
        title: title,
        data: html,
      });
      
      console.log(`   ✓ Processed: ${path.relative(DOCS_DIR, filePath)}`);
    } catch (error) {
      console.error(`   ✗ Error processing ${filePath}:`, error.message);
    }
  });
  
  return chapters;
}

// Generate EPUB
async function generateEPUB() {
  console.log('📚 Starting EPUB generation...');
  console.log('');
  
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  // Process markdown files
  console.log('📖 Reading and processing markdown files...');
  const chapters = processMarkdownFiles();
  console.log(`\n   Found ${chapters.length} chapters`);
  
  if (chapters.length === 0) {
    console.error('❌ No chapters found!');
    process.exit(1);
  }
  
  // Prepare content for EPUB
  const content = chapters.map(chapter => ({
    title: chapter.title,
    data: chapter.data,
  }));
  
  // Generate EPUB
  console.log('\n🔨 Generating EPUB file...');
  
  const options = {
    ...bookMetadata,
    content: content,
    output: OUTPUT_FILE,
  };
  
  try {
    await new Epub(options).promise;
    
    const stats = fs.statSync(OUTPUT_FILE);
    const fileSizeMB = (stats.size / 1024 / 1024).toFixed(2);
    
    console.log(`\n✅ EPUB generated successfully!`);
    console.log(`   📄 File: ${OUTPUT_FILE}`);
    console.log(`   📊 Size: ${fileSizeMB} MB`);
    console.log(`   📚 Chapters: ${chapters.length}`);
  } catch (error) {
    console.error('\n❌ Error generating EPUB:', error);
    process.exit(1);
  }
}

// Run the script
generateEPUB().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
