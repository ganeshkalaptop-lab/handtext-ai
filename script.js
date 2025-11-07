// ========== DOM ELEMENTS ==========
const inputText = document.getElementById('inputText');
const fileUpload = document.getElementById('fileUpload');
const clearBtn = document.getElementById('clearBtn');
const sampleBtn = document.getElementById('sampleBtn');
const wordCount = document.querySelector('.word-count');

// Controls
const fontStyle = document.getElementById('fontStyle');
const inkColor = document.getElementById('inkColor');
const customColor = document.getElementById('customColor');
const paperStyle = document.getElementById('paperStyle');
const pageLayout = document.getElementById('pageLayout');
const fontSize = document.getElementById('fontSize');
const fontSizeValue = document.getElementById('fontSizeValue');
const lineHeight = document.getElementById('lineHeight');
const lineHeightValue = document.getElementById('lineHeightValue');
const pageMargin = document.getElementById('pageMargin');
const marginValue = document.getElementById('marginValue');

// Advanced options
const letterVariation = document.getElementById('letterVariation');
const showPageNumbers = document.getElementById('showPageNumbers');
const showDate = document.getElementById('showDate');

// Preview
const previewContainer = document.getElementById('previewContainer');
const pagesContainer = document.getElementById('pagesContainer');
const zoomIn = document.getElementById('zoomIn');
const zoomOut = document.getElementById('zoomOut');
const zoomLevel = document.getElementById('zoomLevel');

// Buttons
const generateBtn = document.getElementById('generateBtn');
const downloadPng = document.getElementById('downloadPng');
const downloadPdf = document.getElementById('downloadPdf');

// Sections
const downloadSection = document.getElementById('downloadSection');
const toast = document.getElementById('toast');
const loadingOverlay = document.getElementById('loadingOverlay');

// ========== STATE ==========
let currentZoom = 1;
let generatedPages = [];

// ========== SAMPLE TEXT ==========
const sampleText = `The Art of Handwriting in the Digital Age

Handwriting is a timeless form of personal expression that has been treasured throughout human history. Despite living in an increasingly digital world, the beauty and importance of handwriting remain significant.

Research has shown that writing by hand engages different cognitive processes compared to typing. When we write by hand, we activate areas of the brain associated with learning, memory, and critical thinking. This makes handwriting an invaluable tool for students, professionals, and anyone who wants to retain information more effectively.

The uniqueness of each person's handwriting is remarkable. Like a fingerprint, no two people write exactly alike. The slant of letters, the pressure applied to the paper, the spacing between words - all these elements combine to create a distinctive style that is uniquely yours.

In academic settings, handwritten notes have been proven to enhance understanding and recall. The physical act of writing forces us to process information more deeply, leading to better comprehension and longer-lasting retention.

Moreover, handwriting adds a personal touch that digital communication cannot replicate. A handwritten letter, note, or card conveys warmth, thoughtfulness, and effort that typed text simply cannot match.

Whether you're a student taking notes in class, a professional signing important documents, or someone who enjoys journaling, mastering the art of handwriting enriches your life in countless ways. It connects us to our past, enhances our present, and preserves our thoughts for the future.`;

// ========== EVENT LISTENERS ==========

// Word counter
inputText.addEventListener('input', updateWordCount);

function updateWordCount() {
    const text = inputText.value.trim();
    const words = text.length > 0 ? text.split(/\s+/).length : 0;
    wordCount.textContent = `${words.toLocaleString()} words`;
}

// Clear button
clearBtn.addEventListener('click', () => {
    inputText.value = '';
    updateWordCount();
    showToast('Text cleared!', 'success');
});

// Sample text
sampleBtn.addEventListener('click', () => {
    inputText.value = sampleText;
    updateWordCount();
    showToast('Sample text loaded!', 'success');
});

// File upload
fileUpload.addEventListener('change', handleFileUpload);

function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
        inputText.value = event.target.result;
        updateWordCount();
        showToast('File uploaded successfully!', 'success');
    };
    reader.readAsText(file);
}

// Range sliders
fontSize.addEventListener('input', (e) => {
    fontSizeValue.textContent = e.target.value;
});

lineHeight.addEventListener('input', (e) => {
    lineHeightValue.textContent = e.target.value;
});

pageMargin.addEventListener('input', (e) => {
    marginValue.textContent = e.target.value;
});

// Custom color
inkColor.addEventListener('change', (e) => {
    customColor.style.display = e.target.value === 'custom' ? 'block' : 'none';
});

// Zoom controls
zoomIn.addEventListener('click', () => {
    if (currentZoom < 2) {
        currentZoom += 0.1;
        updateZoom();
    }
});

zoomOut.addEventListener('click', () => {
    if (currentZoom > 0.5) {
        currentZoom -= 0.1;
        updateZoom();
    }
});

function updateZoom() {
    pagesContainer.style.transform = `scale(${currentZoom})`;
    zoomLevel.textContent = `${Math.round(currentZoom * 100)}%`;
}

// Generate handwriting
generateBtn.addEventListener('click', generateHandwriting);

function generateHandwriting() {
    const text = inputText.value.trim();
    
    if (!text) {
        showToast('Please enter some text first!', 'error');
        return;
    }
    
    showLoading(true);
    
    // Small delay to show loading animation
    setTimeout(() => {
        try {
            createPages(text);
            showToast('Handwriting generated successfully! ✨', 'success');
        } catch (error) {
            console.error('Error:', error);
            showToast('Error generating handwriting. Please try again.', 'error');
        } finally {
            showLoading(false);
        }
    }, 500);
}

function createPages(text) {
    // Clear previous pages
    pagesContainer.innerHTML = '';
    generatedPages = [];
    
    // Hide placeholder, show pages
    document.querySelector('.preview-placeholder').style.display = 'none';
    pagesContainer.style.display = 'flex';
    downloadSection.style.display = 'block';
    
    // Get settings
    const selectedFont = fontStyle.value;
    const selectedColor = inkColor.value === 'custom' ? customColor.value : inkColor.value;
    const selectedPaper = paperStyle.value;
    const selectedSize = fontSize.value + 'px';
    const selectedLineHeight = lineHeight.value;
    const selectedMargin = pageMargin.value + 'px';
    const layout = pageLayout.value;
    
    if (layout === 'single') {
        // Create single long page
        const page = createPage(text, 1, 1, selectedFont, selectedColor, selectedPaper, selectedSize, selectedLineHeight, selectedMargin, false);
        pagesContainer.appendChild(page);
        generatedPages.push(page);
    } else {
        // Create multiple A4 pages
        const pages = splitTextIntoPages(text);
        pages.forEach((pageText, index) => {
            const page = createPage(pageText, index + 1, pages.length, selectedFont, selectedColor, selectedPaper, selectedSize, selectedLineHeight, selectedMargin, true);
            pagesContainer.appendChild(page);
            generatedPages.push(page);
        });
    }
}

function createPage(text, pageNum, totalPages, font, color, paper, size, lineHt, margin, isMultiPage) {
    const page = document.createElement('div');
    page.className = `page ${paper}`;
    
    // Page header (date)
    if (showDate.checked) {
        const header = document.createElement('div');
        header.className = 'page-header';
        const dateSpan = document.createElement('span');
        dateSpan.className = 'page-date';
        dateSpan.textContent = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        header.appendChild(dateSpan);
        page.appendChild(header);
    }
    
    // Page content
    const content = document.createElement('div');
    content.className = `page-content ${font}`;
    content.textContent = text;
    content.style.color = color;
    content.style.fontSize = size;
    content.style.lineHeight = lineHt;
    content.style.padding = margin;
    
    // Add letter variation
    if (letterVariation.checked) {
        content.style.letterSpacing = '0.5px';
        content.style.wordSpacing = '2px';
    }
    
    page.appendChild(content);
    
    // Page footer (page number)
    if (showPageNumbers.checked && isMultiPage) {
        const footer = document.createElement('div');
        footer.className = 'page-footer';
        const pageNumber = document.createElement('span');
        pageNumber.className = 'page-number';
        pageNumber.textContent = `Page ${pageNum} of ${totalPages}`;
        footer.appendChild(pageNumber);
        page.appendChild(footer);
    }
    
    return page;
}

function splitTextIntoPages(text) {
    // Approximate characters per A4 page (depends on font size)
    const charsPerPage = 3000; // Adjust based on font size
    const pages = [];
    
    if (text.length <= charsPerPage) {
        return [text];
    }
    
    // Split by paragraphs first
    const paragraphs = text.split('\n\n');
    let currentPage = '';
    
    paragraphs.forEach(para => {
        if ((currentPage + para).length > charsPerPage && currentPage.length > 0) {
            pages.push(currentPage.trim());
            currentPage = para + '\n\n';
        } else {
            currentPage += para + '\n\n';
        }
    });
    
    if (currentPage.trim().length > 0) {
        pages.push(currentPage.trim());
    }
    
    return pages;
}

// Download as PNG
downloadPng.addEventListener('click', async () => {
    if (generatedPages.length === 0) return;
    
    showLoading(true);
    downloadPng.disabled = true;
    
    try {
        if (generatedPages.length === 1) {
            // Single image
            const canvas = await html2canvas(generatedPages[0], {
                scale: 3,
                backgroundColor: paperStyle.value === 'plain' ? '#ffffff' : null,
                logging: false,
                useCORS: true
            });
            
            downloadCanvas(canvas, 'handwriting.png');
        } else {
            // Multiple images (download as zip would require additional library)
            // For now, download first page
            const canvas = await html2canvas(generatedPages[0], {
                scale: 3,
                backgroundColor: paperStyle.value === 'plain' ? '#ffffff' : null,
                logging: false,
                useCORS: true
            });
            
            downloadCanvas(canvas, 'handwriting-page-1.png');
            showToast(`Downloaded page 1 of ${generatedPages.length}. Click again for more pages.`, 'success');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error downloading image. Please try again.', 'error');
    } finally {
        showLoading(false);
        downloadPng.disabled = false;
    }
});

// Download as PDF
downloadPdf.addEventListener('click', async () => {
    if (generatedPages.length === 0) return;
    
    showLoading(true);
    downloadPdf.disabled = true;
    
    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        for (let i = 0; i < generatedPages.length; i++) {
            const canvas = await html2canvas(generatedPages[i], {
                scale: 2,
                backgroundColor: paperStyle.value === 'plain' ? '#ffffff' : null,
                logging: false,
                useCORS: true
            });
            
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210; // A4 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
            if (i > 0) {
                pdf.addPage();
            }
            
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        }
        
        pdf.save('handwriting.pdf');
        showToast(`PDF with ${generatedPages.length} page(s) downloaded! 🎉`, 'success');
    } catch (error) {
        console.error('Error:', error);
        showToast('Error generating PDF. Please try again.', 'error');
    } finally {
        showLoading(false);
        downloadPdf.disabled = false;
    }
});

// Helper function to download canvas
function downloadCanvas(canvas, filename) {
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// Show toast notification
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Show/hide loading
function showLoading(show) {
    loadingOverlay.style.display = show ? 'flex' : 'none';
}

// Initialize
updateWordCount();