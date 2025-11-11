// ========== DOM ELEMENTS ==========
const textInput = document.getElementById('textInput');
const charCount = document.getElementById('charCount');
const wordCount = document.getElementById('wordCount');
const clearBtn = document.getElementById('clearBtn');
const sampleBtn = document.getElementById('sampleBtn');
const themeBtn = document.getElementById('themeBtn');
const generateBtn = document.getElementById('generateBtn');
const downloadPNG = document.getElementById('downloadPNG');
const downloadPDF = document.getElementById('downloadPDF');
const fontGrid = document.getElementById('fontGrid');
const fontSize = document.getElementById('fontSize');
const sizeValue = document.getElementById('sizeValue');
const lineSpacing = document.getElementById('lineSpacing');
const spacingValue = document.getElementById('spacingValue');
const paperSelector = document.getElementById('paperSelector');
const emptyState = document.getElementById('emptyState');
const pagesContainer = document.getElementById('pagesContainer');
const downloadBtns = document.getElementById('downloadBtns');
const loadingOverlay = document.getElementById('loadingOverlay');
const toast = document.getElementById('toast');

// ========== STATE ==========
let selectedFont = 'font-caveat';
let selectedColor = '#000000';
let selectedPaper = 'ruled';
let selectedBgColor = '#FFFFFF';
let currentTheme = 'light';

// ========== 70 REALISTIC HANDWRITING FONTS DATABASE ==========
const fonts = [
    { name: 'Caveat', class: 'font-caveat' },
    { name: 'Dancing Script', class: 'font-dancing' },
    { name: 'Indie Flower', class: 'font-indie' },
    { name: 'Kalam', class: 'font-kalam' },
    { name: 'Patrick Hand', class: 'font-patrick' },
    { name: 'Shadows Into Light', class: 'font-shadows' },
    { name: 'Architects Daughter', class: 'font-architects' },
    { name: 'Gloria Hallelujah', class: 'font-gloria' },
    { name: 'Permanent Marker', class: 'font-permanent' },
    { name: 'Amatic SC', class: 'font-amatic' },
    { name: 'Homemade Apple', class: 'font-homemade' },
    { name: 'Satisfy', class: 'font-satisfy' },
    { name: 'Pacifico', class: 'font-pacifico' },
    { name: 'Courgette', class: 'font-courgette' },
    { name: 'Cookie', class: 'font-cookie' },
    { name: 'Great Vibes', class: 'font-great-vibes' },
    { name: 'Sacramento', class: 'font-sacramento' },
    { name: 'Allura', class: 'font-allura' },
    { name: 'Yellowtail', class: 'font-yellowtail' },
    { name: 'Tangerine', class: 'font-tangerine' },
    { name: 'Reenie Beanie', class: 'font-reenie' },
    { name: 'Nothing You Could Do', class: 'font-nothing' },
    { name: 'Waiting for the Sunrise', class: 'font-waiting' },
    { name: 'Rock Salt', class: 'font-rock-salt' },
    { name: 'Just Another Hand', class: 'font-just-another' },
    { name: 'Schoolbell', class: 'font-schoolbell' },
    { name: 'Coming Soon', class: 'font-coming-soon' },
    { name: 'Covered By Your Grace', class: 'font-covered' },
    { name: 'Crafty Girls', class: 'font-crafty' },
    { name: 'Walter Turncoat', class: 'font-walter' },
    { name: 'Sue Ellen Francisco', class: 'font-sue-ellen' },
    { name: 'Swanky and Moo Moo', class: 'font-swanky' },
    { name: 'Annie Use Your Telescope', class: 'font-annie' },
    { name: 'Loved by the King', class: 'font-loved' },
    { name: 'Dawning of a New Day', class: 'font-dawning' },
    { name: 'League Script', class: 'font-league' },
    { name: 'Give You Glory', class: 'font-glory' },
    { name: 'La Belle Aurore', class: 'font-belle' },
    { name: 'Over the Rainbow', class: 'font-rainbow' },
    { name: 'Gochi Hand', class: 'font-gochi' },
    { name: 'Handlee', class: 'font-handlee' },
    { name: 'Neucha', class: 'font-neucha' },
    { name: 'Pangolin', class: 'font-pangolin' },
    { name: 'Sriracha', class: 'font-sriracha' },
    { name: 'Calligraffitti', class: 'font-calligraffitti' },
    { name: 'Meie Script', class: 'font-meie' },
    { name: 'Engagement', class: 'font-engagement' },
    { name: 'Alex Brush', class: 'font-alex-brush' },
    { name: 'Kaushan Script', class: 'font-kaushan' },
    { name: 'Marck Script', class: 'font-marck' },
    { name: 'Mr Dafoe', class: 'font-mr-dafoe' },
    { name: 'Pinyon Script', class: 'font-pinyon' },
    { name: 'Vibur', class: 'font-vibur' },
    { name: 'Bad Script', class: 'font-bad-script' },
    { name: 'Cedarville Cursive', class: 'font-cedarville' },
    { name: 'Dekko', class: 'font-dekko' },
    { name: 'Delius', class: 'font-delius' },
    { name: 'Kristi', class: 'font-kristi' },
    { name: 'Petit Formal Script', class: 'font-petit' },
    { name: 'Rochester', class: 'font-rochester' },
    { name: 'Stalemate', class: 'font-stalemate' },
    { name: 'Zeyada', class: 'font-zeyada' },
    { name: 'Damion', class: 'font-damion' },
    { name: 'Italianno', class: 'font-italianno' },
    { name: 'Monsieur La Doulaise', class: 'font-monsieur' },
    { name: 'Rouge Script', class: 'font-rouge' },
    { name: 'Norican', class: 'font-norican' },
    { name: 'Euphoria Script', class: 'font-euphoria' },
    { name: 'Mrs Saint Delafield', class: 'font-mrs-saint' },
    { name: 'Niconne', class: 'font-niconne' },
    { name: 'Qwigley', class: 'font-qwigley' },
    { name: 'Ruthie', class: 'font-ruthie' },
    { name: 'Sedgwick Ave', class: 'font-sedgwick' },
    { name: 'Short Stack', class: 'font-short-stack' },
    { name: 'Sniglet', class: 'font-sniglet' },
    { name: 'Tillana', class: 'font-tillana' },
    { name: 'Varela Round', class: 'font-varela' },
    { name: 'Condiment', class: 'font-condiment' },
    { name: 'Mali', class: 'font-mali' }
];

// ========== 4 PAPER TYPES ==========
const paperTypes = [
    { id: 'ruled', name: '📓 Classic Ruled', icon: '📓' },
    { id: 'grid', name: '🔲 Grid Paper', icon: '🔲' },
    { id: 'dotted', name: '⚪ Dotted Journal', icon: '⚪' },
    { id: 'plain', name: '📃 Plain White', icon: '📃' }
];

// ========== SAMPLE TEXTS ==========
const sampleTexts = [
    "Dear Diary,\nToday was an amazing day! I finally finished reading that book I've been working on for weeks.",
    "Shopping List:\n- Milk\n- Eggs\n- Bread\n- Coffee\n- Fruits\nDon't forget to check expiry dates!",
    "Meeting Notes:\n• Deadline: Next Friday\n• Team: Sarah, John, Mike\n• Budget: $5000",
    "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet.",
    "To-Do List:\n1. Wake up at 7 AM\n2. Morning jog\n3. Study for exam\n4. Lunch with friends"
];

// ========== INITIALIZE FONTS ==========
function initializeFonts() {
    fontGrid.innerHTML = '';
    fonts.forEach(function(font) {
        const fontItem = document.createElement('div');
        fontItem.className = 'font-item ' + font.class;
        if (font.class === selectedFont) {
            fontItem.classList.add('active');
        }
        fontItem.textContent = font.name;
        fontItem.dataset.font = font.class;
        
        fontItem.addEventListener('click', function() {
            document.querySelectorAll('.font-item').forEach(function(item) {
                item.classList.remove('active');
            });
            fontItem.classList.add('active');
            selectedFont = font.class;
        });
        
        fontGrid.appendChild(fontItem);
    });
}

// ========== INITIALIZE PAPER SELECTOR ==========
function initializePaperSelector() {
    paperSelector.innerHTML = '';
    
    paperTypes.forEach(function(paper) {
        const paperCard = document.createElement('div');
        paperCard.className = 'paper-card';
        if (paper.id === selectedPaper) {
            paperCard.classList.add('active');
        }
        paperCard.dataset.paper = paper.id;
        
        const preview = document.createElement('canvas');
        preview.className = 'paper-preview';
        preview.width = 300;
        preview.height = 160;
        
        drawPaperPreview(preview, paper.id);
        
        const name = document.createElement('div');
        name.className = 'paper-name';
        name.textContent = paper.name;
        
        paperCard.appendChild(preview);
        paperCard.appendChild(name);
        
        paperCard.addEventListener('click', function() {
            document.querySelectorAll('.paper-card').forEach(function(card) {
                card.classList.remove('active');
            });
            paperCard.classList.add('active');
            selectedPaper = paper.id;
            showToast(paper.icon + ' ' + paper.name + ' selected!');
        });
        
        paperSelector.appendChild(paperCard);
    });
}

// ========== DRAW PAPER PREVIEW ==========
function drawPaperPreview(canvas, type) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.fillStyle = '#FFFEF0';
    ctx.fillRect(0, 0, width, height);
    
    if (type === 'ruled') {
        ctx.strokeStyle = '#A5B4C7';
        ctx.lineWidth = 1;
        const spacing = 15;
        for (let y = spacing; y < height; y += spacing) {
            ctx.beginPath();
            ctx.moveTo(10, y);
            ctx.lineTo(width - 10, y);
            ctx.stroke();
        }
    } else if (type === 'grid') {
        const gridSpacing = 15;
        ctx.strokeStyle = '#C5D3E0';
        ctx.lineWidth = 0.8;
        
        for (let x = 0; x < width; x += gridSpacing) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        
        for (let y = 0; y < height; y += gridSpacing) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
    } else if (type === 'dotted') {
        const dotSpacing = 15;
        ctx.fillStyle = '#B0BEC5';
        
        for (let y = dotSpacing; y < height; y += dotSpacing) {
            for (let x = dotSpacing; x < width; x += dotSpacing) {
                ctx.beginPath();
                ctx.arc(x, y, 1, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
}

// ========== INK COLOR PICKER ==========
const colorBoxes = document.querySelectorAll('.color-box');
colorBoxes.forEach(function(box) {
    box.addEventListener('click', function() {
        colorBoxes.forEach(function(b) {
            b.classList.remove('active');
        });
        box.classList.add('active');
        selectedColor = box.dataset.color;
        showToast('Ink color changed! 🖊️');
    });
});

// ========== BACKGROUND COLOR PICKER ==========
const bgColorBoxes = document.querySelectorAll('.bg-color-box');
bgColorBoxes.forEach(function(box) {
    box.addEventListener('click', function() {
        bgColorBoxes.forEach(function(b) {
            b.classList.remove('active');
        });
        box.classList.add('active');
        selectedBgColor = box.dataset.bg;
        showToast('Paper color changed! 🎨');
    });
});

// ========== TEXT COUNTER ==========
function updateCounters() {
    const text = textInput.value;
    const chars = text.length;
    const words = text.trim().length > 0 ? text.trim().split(/\s+/).length : 0;
    
    charCount.textContent = chars + ' character' + (chars !== 1 ? 's' : '');
    wordCount.textContent = words + ' word' + (words !== 1 ? 's' : '');
}

textInput.addEventListener('input', updateCounters);

// ========== SLIDERS ==========
fontSize.addEventListener('input', function(e) {
    sizeValue.textContent = e.target.value + 'px';
});

lineSpacing.addEventListener('input', function(e) {
    spacingValue.textContent = e.target.value;
});

// ========== BUTTONS ==========
clearBtn.addEventListener('click', function() {
    textInput.value = '';
    updateCounters();
    showToast('Text cleared! 🗑️');
});

sampleBtn.addEventListener('click', function() {
    const randomSample = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    textInput.value = randomSample;
    updateCounters();
    showToast('Sample text loaded! 📋');
});

themeBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    themeBtn.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    showToast(currentTheme === 'dark' ? 'Dark mode enabled 🌙' : 'Light mode enabled ☀️');
});

// ========== GENERATE HANDWRITING ==========
generateBtn.addEventListener('click', function() {
    const text = textInput.value.trim();
    
    if (!text) {
        showToast('⚠️ Please enter some text first!');
        return;
    }
    
    showLoading(true);
    
    setTimeout(function() {
        generatePages(text);
        showLoading(false);
        showToast('✨ Handwriting generated successfully!');
    }, 500);
});

// ========== GENERATE PAGES ==========
function generatePages(text) {
    pagesContainer.innerHTML = '';
    emptyState.style.display = 'none';
    pagesContainer.style.display = 'flex';
    downloadBtns.style.display = 'flex';
    
    const charsPerPage = 3000;
    const pages = splitTextIntoPages(text, charsPerPage);
    
    pages.forEach(function(pageText, index) {
        const page = createPage(pageText, index + 1, pages.length);
        pagesContainer.appendChild(page);
    });
    
    pagesContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ========== CREATE PAGE ==========
function createPage(text, pageNum, totalPages) {
    const page = document.createElement('div');
    page.className = 'page';
    page.style.backgroundColor = selectedBgColor;
    
    const canvas = document.createElement('canvas');
    canvas.className = 'page-lines-canvas';
    canvas.width = 794;
    canvas.height = 1123;
    
    drawPaperLines(canvas, selectedPaper, selectedBgColor);
    
    const content = document.createElement('div');
    content.className = 'page-content ' + selectedFont;
    content.textContent = text;
    content.style.fontSize = fontSize.value + 'px';
    content.style.lineHeight = lineSpacing.value;
    content.style.color = selectedColor;
    
    if (totalPages > 1) {
        const pageNumber = document.createElement('div');
        pageNumber.className = 'page-number';
        pageNumber.textContent = 'Page ' + pageNum + ' of ' + totalPages;
        page.appendChild(pageNumber);
    }
    
    page.appendChild(canvas);
    page.appendChild(content);
    
    return page;
}

// ========== DRAW PAPER LINES ==========
function drawPaperLines(canvas, type, bgColor) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.fillStyle = bgColor || '#FFFFFF';
    ctx.fillRect(0, 0, width, height);
    
    if (type === 'ruled') {
        ctx.strokeStyle = '#A5B4C7';
        ctx.lineWidth = 1.5;
        const ruledSpacing = 30;
        const ruledStartY = 50;
        
        for (let y = ruledStartY; y < height - 40; y += ruledSpacing) {
            ctx.beginPath();
            ctx.moveTo(40, y);
            ctx.lineTo(width - 40, y);
            ctx.stroke();
        }
    } else if (type === 'grid') {
        const gridSpacing = 20;
        ctx.strokeStyle = '#C5D3E0';
        ctx.lineWidth = 0.8;
        
        for (let x = 0; x < width; x += gridSpacing) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        
        for (let y = 0; y < height; y += gridSpacing) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
    } else if (type === 'dotted') {
        const dotSpacing = 25;
        ctx.fillStyle = '#B0BEC5';
        
        for (let y = dotSpacing; y < height; y += dotSpacing) {
            for (let x = dotSpacing; x < width; x += dotSpacing) {
                ctx.beginPath();
                ctx.arc(x, y, 1.2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
}

// ========== SPLIT TEXT ==========
function splitTextIntoPages(text, charsPerPage) {
    const pages = [];
    const paragraphs = text.split('\n\n');
    let currentPage = '';
    
    paragraphs.forEach(function(para) {
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
    
    return pages.length > 0 ? pages : [text];
}

// ========== DOWNLOAD PNG ==========
downloadPNG.addEventListener('click', function() {
    showLoading(true);
    
    setTimeout(function() {
        const pages = document.querySelectorAll('.page');
        
        if (pages.length === 0) {
            showToast('⚠️ No pages to download!');
            showLoading(false);
            return;
        }
        
        const page = pages[0];
        const isMobile = window.innerWidth <= 768;
        const scale = isMobile ? 1.5 : 2;
        
        html2canvas(page, {
            scale: scale,
            useCORS: true,
            allowTaint: false,
            backgroundColor: selectedBgColor
        }).then(function(canvas) {
            const link = document.createElement('a');
            link.download = 'handwriting-' + Date.now() + '.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
            
            showToast('✅ PNG downloaded successfully!');
            showLoading(false);
        }).catch(function(error) {
            console.error('PNG Download Error:', error);
            showToast('❌ Download failed. Please try again.');
            showLoading(false);
        });
    }, 100);
});

// ========== DOWNLOAD PDF ==========
downloadPDF.addEventListener('click', function() {
    showLoading(true);
    
    setTimeout(function() {
        const pages = document.querySelectorAll('.page');
        
        if (pages.length === 0) {
            showToast('⚠️ No pages to download!');
            showLoading(false);
            return;
        }
        
        const jsPDF = window.jspdf.jsPDF;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const isMobile = window.innerWidth <= 768;
        const scale = isMobile ? 1.5 : 2;
        
        let processed = 0;
        
        pages.forEach(function(page, i) {
            html2canvas(page, {
                scale: scale,
                useCORS: true,
                allowTaint: false,
                backgroundColor: selectedBgColor
            }).then(function(canvas) {
                const imgData = canvas.toDataURL('image/png');
                const imgWidth = 210;
                const imgHeight = 297;
                
                if (i > 0) {
                    pdf.addPage();
                }
                
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                
                processed++;
                
                if (processed === pages.length) {
                    pdf.save('handwriting-' + Date.now() + '.pdf');
                    showToast('✅ PDF downloaded! (' + pages.length + ' page' + (pages.length > 1 ? 's' : '') + ')');
                    showLoading(false);
                }
            }).catch(function(error) {
                console.error('PDF Error:', error);
                showToast('❌ PDF generation failed.');
                showLoading(false);
            });
        });
    }, 100);
});

// ========== UTILITIES ==========
function showLoading(show) {
    loadingOverlay.style.display = show ? 'flex' : 'none';
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(function() {
        toast.classList.remove('show');
    }, 3000);
}

// ========== INITIALIZE ==========
document.addEventListener('DOMContentLoaded', function() {
    initializeFonts();
    initializePaperSelector();
    updateCounters();
    console.log('✍️ TextToHand - Ready!');
});