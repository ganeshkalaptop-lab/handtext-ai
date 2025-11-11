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
let currentTheme = 'light';

// ========== 70 REALISTIC HANDWRITING FONTS DATABASE ==========
const fonts = [
    // Original 20 fonts
    { name: 'Caveat', class: 'font-caveat', sample: 'The quick brown fox' },
    { name: 'Dancing Script', class: 'font-dancing', sample: 'The quick brown fox' },
    { name: 'Indie Flower', class: 'font-indie', sample: 'The quick brown fox' },
    { name: 'Kalam', class: 'font-kalam', sample: 'The quick brown fox' },
    { name: 'Patrick Hand', class: 'font-patrick', sample: 'The quick brown fox' },
    { name: 'Shadows Into Light', class: 'font-shadows', sample: 'The quick brown fox' },
    { name: 'Architects Daughter', class: 'font-architects', sample: 'The quick brown fox' },
    { name: 'Gloria Hallelujah', class: 'font-gloria', sample: 'The quick brown fox' },
    { name: 'Permanent Marker', class: 'font-permanent', sample: 'The quick brown fox' },
    { name: 'Amatic SC', class: 'font-amatic', sample: 'The quick brown fox' },
    { name: 'Homemade Apple', class: 'font-homemade', sample: 'The quick brown fox' },
    { name: 'Satisfy', class: 'font-satisfy', sample: 'The quick brown fox' },
    { name: 'Pacifico', class: 'font-pacifico', sample: 'The quick brown fox' },
    { name: 'Courgette', class: 'font-courgette', sample: 'The quick brown fox' },
    { name: 'Cookie', class: 'font-cookie', sample: 'The quick brown fox' },
    { name: 'Great Vibes', class: 'font-great-vibes', sample: 'The quick brown fox' },
    { name: 'Sacramento', class: 'font-sacramento', sample: 'The quick brown fox' },
    { name: 'Allura', class: 'font-allura', sample: 'The quick brown fox' },
    { name: 'Yellowtail', class: 'font-yellowtail', sample: 'The quick brown fox' },
    { name: 'Tangerine', class: 'font-tangerine', sample: 'The quick brown fox' },
    
    // 50 NEW REALISTIC HANDWRITING FONTS
    { name: 'Reenie Beanie', class: 'font-reenie', sample: 'The quick brown fox' },
    { name: 'Nothing You Could Do', class: 'font-nothing', sample: 'The quick brown fox' },
    { name: 'Waiting for the Sunrise', class: 'font-waiting', sample: 'The quick brown fox' },
    { name: 'Rock Salt', class: 'font-rock-salt', sample: 'The quick brown fox' },
    { name: 'Just Another Hand', class: 'font-just-another', sample: 'The quick brown fox' },
    { name: 'Schoolbell', class: 'font-schoolbell', sample: 'The quick brown fox' },
    { name: 'Coming Soon', class: 'font-coming-soon', sample: 'The quick brown fox' },
    { name: 'Covered By Your Grace', class: 'font-covered', sample: 'The quick brown fox' },
    { name: 'Crafty Girls', class: 'font-crafty', sample: 'The quick brown fox' },
    { name: 'Walter Turncoat', class: 'font-walter', sample: 'The quick brown fox' },
    { name: 'Sue Ellen Francisco', class: 'font-sue-ellen', sample: 'The quick brown fox' },
    { name: 'Swanky and Moo Moo', class: 'font-swanky', sample: 'The quick brown fox' },
    { name: 'Annie Use Your Telescope', class: 'font-annie', sample: 'The quick brown fox' },
    { name: 'Loved by the King', class: 'font-loved', sample: 'The quick brown fox' },
    { name: 'Dawning of a New Day', class: 'font-dawning', sample: 'The quick brown fox' },
    { name: 'League Script', class: 'font-league', sample: 'The quick brown fox' },
    { name: 'Give You Glory', class: 'font-glory', sample: 'The quick brown fox' },
    { name: 'La Belle Aurore', class: 'font-belle', sample: 'The quick brown fox' },
    { name: 'Over the Rainbow', class: 'font-rainbow', sample: 'The quick brown fox' },
    { name: 'Gochi Hand', class: 'font-gochi', sample: 'The quick brown fox' },
    { name: 'Handlee', class: 'font-handlee', sample: 'The quick brown fox' },
    { name: 'Neucha', class: 'font-neucha', sample: 'The quick brown fox' },
    { name: 'Pangolin', class: 'font-pangolin', sample: 'The quick brown fox' },
    { name: 'Sriracha', class: 'font-sriracha', sample: 'The quick brown fox' },
    { name: 'Calligraffitti', class: 'font-calligraffitti', sample: 'The quick brown fox' },
    { name: 'Meie Script', class: 'font-meie', sample: 'The quick brown fox' },
    { name: 'Engagement', class: 'font-engagement', sample: 'The quick brown fox' },
    { name: 'Alex Brush', class: 'font-alex-brush', sample: 'The quick brown fox' },
    { name: 'Kaushan Script', class: 'font-kaushan', sample: 'The quick brown fox' },
    { name: 'Marck Script', class: 'font-marck', sample: 'The quick brown fox' },
    { name: 'Mr Dafoe', class: 'font-mr-dafoe', sample: 'The quick brown fox' },
    { name: 'Pinyon Script', class: 'font-pinyon', sample: 'The quick brown fox' },
    { name: 'Vibur', class: 'font-vibur', sample: 'The quick brown fox' },
    { name: 'Bad Script', class: 'font-bad-script', sample: 'The quick brown fox' },
    { name: 'Cedarville Cursive', class: 'font-cedarville', sample: 'The quick brown fox' },
    { name: 'Dekko', class: 'font-dekko', sample: 'The quick brown fox' },
    { name: 'Delius', class: 'font-delius', sample: 'The quick brown fox' },
    { name: 'Kristi', class: 'font-kristi', sample: 'The quick brown fox' },
    { name: 'Petit Formal Script', class: 'font-petit', sample: 'The quick brown fox' },
    { name: 'Rochester', class: 'font-rochester', sample: 'The quick brown fox' },
    { name: 'Stalemate', class: 'font-stalemate', sample: 'The quick brown fox' },
    { name: 'Zeyada', class: 'font-zeyada', sample: 'The quick brown fox' },
    { name: 'Damion', class: 'font-damion', sample: 'The quick brown fox' },
    { name: 'Italianno', class: 'font-italianno', sample: 'The quick brown fox' },
    { name: 'Monsieur La Doulaise', class: 'font-monsieur', sample: 'The quick brown fox' },
    { name: 'Rouge Script', class: 'font-rouge', sample: 'The quick brown fox' },
    { name: 'Norican', class: 'font-norican', sample: 'The quick brown fox' },
    { name: 'Euphoria Script', class: 'font-euphoria', sample: 'The quick brown fox' },
    { name: 'Mrs Saint Delafield', class: 'font-mrs-saint', sample: 'The quick brown fox' },
    { name: 'Niconne', class: 'font-niconne', sample: 'The quick brown fox' },
    { name: 'Qwigley', class: 'font-qwigley', sample: 'The quick brown fox' },
    { name: 'Ruthie', class: 'font-ruthie', sample: 'The quick brown fox' },
    { name: 'Sedgwick Ave', class: 'font-sedgwick', sample: 'The quick brown fox' },
    { name: 'Short Stack', class: 'font-short-stack', sample: 'The quick brown fox' },
    { name: 'Sniglet', class: 'font-sniglet', sample: 'The quick brown fox' },
    { name: 'Tillana', class: 'font-tillana', sample: 'The quick brown fox' },
    { name: 'Varela Round', class: 'font-varela', sample: 'The quick brown fox' },
    { name: 'Condiment', class: 'font-condiment', sample: 'The quick brown fox' },
    { name: 'Mali', class: 'font-mali', sample: 'The quick brown fox' }
];

// ========== UPDATED: ONLY 4 PAPER TYPES (Removed Composition, Spiral, College) ==========
const paperTypes = [
    {
        id: 'ruled',
        name: '📓 Classic Ruled',
        icon: '📓',
        description: 'Traditional notebook lines'
    },
    {
        id: 'grid',
        name: '🔲 Grid Paper',
        icon: '🔲',
        description: 'Square grid pattern'
    },
    {
        id: 'dotted',
        name: '⚪ Dotted Journal',
        icon: '⚪',
        description: 'Bullet journal style'
    },
    {
        id: 'plain',
        name: '📃 Plain White',
        icon: '📃',
        description: 'Clean white paper'
    }
];

// ========== 50+ REALISTIC SAMPLE TEXTS ==========
const sampleTexts = [
    "Dear Diary,\nToday was an amazing day! I finally finished reading that book I've been working on for weeks. The ending was unexpected but beautiful.",
    
    "Shopping List:\n- Milk\n- Eggs\n- Bread\n- Coffee\n- Fruits (apples, bananas)\n- Vegetables\n- Chicken\nDon't forget to check expiry dates!",
    
    "Meeting Notes - Project Discussion\n• Deadline: Next Friday\n• Team members: Sarah, John, Mike\n• Budget: $5000\n• Action items: Review design, finalize proposal",
    
    "Recipe: Chocolate Chip Cookies\nIngredients:\n- 2 cups flour\n- 1 cup butter\n- 1 cup sugar\n- 2 eggs\n- Chocolate chips\nBake at 350°F for 12 minutes",
    
    "Dear Mom,\nI hope you're doing well. I miss you so much! College life is busy but exciting. I've made some great friends here. Will call you this weekend.\nLove, Sarah",
    
    "To-Do List for Today:\n1. Wake up at 7 AM ✓\n2. Go for morning jog\n3. Study for exam (2 hours)\n4. Lunch with friends\n5. Complete assignment\n6. Call parents",
    
    "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the English alphabet at least once.",
    
    "Birthday Party Planning:\nDate: Saturday, 3 PM\nVenue: City Park\nGuests: 25 people\nFood: Pizza, cake, drinks\nDecorations: Balloons, banners\nRemember to send invitations!",
    
    "Book Review: 'To Kill a Mockingbird'\nThis classic novel explores themes of racism and justice in the American South. Scout's coming-of-age story is both heartwarming and thought-provoking.",
    
    "Workout Plan:\nMonday: Cardio (30 min)\nTuesday: Upper body strength\nWednesday: Rest\nThursday: Legs and core\nFriday: Full body\nWeekend: Light yoga",
    
    "Dear John,\nThank you for your help with the project. Your insights were invaluable. Let's catch up over coffee next week.\nBest regards, Emma",
    
    "Travel Bucket List:\n• Paris, France - See the Eiffel Tower\n• Tokyo, Japan - Experience cherry blossoms\n• New York City - Visit Times Square\n• Iceland - See Northern Lights",
    
    "Study Notes: History Chapter 5\nThe Renaissance period (14th-17th century) marked a cultural rebirth in Europe. Key figures include Leonardo da Vinci, Michelangelo, and Shakespeare.",
    
    "Grocery Budget This Month:\nVegetables: $50\nFruits: $30\nDairy: $40\nMeat: $60\nSnacks: $25\nTotal: $205\nTrying to save $50 next month!",
    
    "Poem: Autumn Leaves\nGolden leaves dancing in the breeze,\nWhispers of autumn through the trees,\nCrisp air and pumpkin spice,\nEverything autumn is oh so nice.",
    
    "Dear Future Me,\nI hope you're living your dreams right now. Remember to stay kind, work hard, and never give up on what makes you happy.\nWith love, Present You",
    
    "Math Homework - Chapter 7:\nProblem 1: Solve for x: 2x + 5 = 15\nSolution: 2x = 10, x = 5\nProblem 2: Calculate area of circle with radius 7cm\nArea = πr² = 153.94 cm²",
    
    "Motivational Quote:\n\"The only way to do great work is to love what you do.\" - Steve Jobs\n\nThis really resonates with me today.",
    
    "Packing List for Trip:\n□ Clothes (7 days)\n□ Toiletries\n□ Phone charger\n□ Passport\n□ Sunscreen\n□ Camera\n□ Medications\n□ Travel pillow",
    
    "Dear Teacher,\nI apologize for missing yesterday's class. I was feeling unwell. I've completed the assignment and will submit it tomorrow.\nThank you for understanding.\nStudent: Alex",
    
    "Garden Journal - Spring 2024:\nPlanted tomatoes today in the backyard. Weather is perfect - sunny with light breeze. Hoping for a good harvest this summer!",
    
    "Financial Goals This Year:\n1. Save $5000 for emergency fund\n2. Pay off credit card debt\n3. Start investing in stocks\n4. Reduce unnecessary expenses",
    
    "Dear Best Friend,\nRemember when we used to stay up all night talking about our dreams? Let's make them come true together. Miss our late-night conversations!\nXOXO",
    
    "Practice makes perfect. The more you write by hand, the better your handwriting becomes over time. Keep practicing daily!",
    
    "Reflection on Today:\nToday I learned that patience is truly a virtue. Things don't always go as planned, but staying calm helps find better solutions.",
    
    "Class Schedule - Fall Semester:\nMonday: Math 9AM, English 11AM\nTuesday: Science 10AM, History 1PM\nWednesday: Art 9AM, PE 2PM\nThursday: Same as Tuesday\nFriday: Review sessions",
    
    "Thank You Note:\nDear Sarah,\nThank you so much for the wonderful birthday gift! It was exactly what I wanted. You're the best friend anyone could ask for.\nLove, Emma",
    
    "Morning Routine:\n6:00 AM - Wake up\n6:15 AM - Exercise\n7:00 AM - Shower\n7:30 AM - Breakfast\n8:00 AM - Leave for work\nStick to this schedule!",
    
    "Inspirational Thoughts:\nEvery day is a new opportunity to be better than yesterday. Don't let small setbacks discourage you from your bigger goals.",
    
    "Pet Care Reminder:\n• Feed Max at 8 AM and 6 PM\n• Walk him twice daily\n• Vet appointment next Thursday\n• Buy dog food this weekend\n• Bath time on Saturday",
    
    "Dear Diary,\nSometimes I wonder what the future holds. But I'm learning to embrace uncertainty and trust the journey. Today was a good reminder of that.",
    
    "Languages I Want to Learn:\n1. Spanish - Starting next month\n2. French - After Spanish\n3. Japanese - Long-term goal\n4. German - Maybe someday",
    
    "Favorite Quotes Collection:\n\"Be yourself; everyone else is already taken.\" - Oscar Wilde\n\"Life is what happens when you're busy making other plans.\" - John Lennon",
    
    "Weekly Meal Plan:\nMonday: Pasta with marinara sauce\nTuesday: Grilled chicken salad\nWednesday: Stir-fry vegetables\nThursday: Tacos\nFriday: Pizza night!",
    
    "Self-Care Sunday:\n• Face mask\n• Long bath\n• Read a book\n• Watch favorite movie\n• Early bedtime\nTaking care of myself is important!",
    
    "Project Ideas:\n- Start a blog about travel\n- Learn to play guitar\n- Volunteer at animal shelter\n- Take photography classes\n- Write short stories",
    
    "Dear Past Me,\nI'm proud of how far we've come. Thank you for not giving up during tough times. The struggles were worth it.\nLove, Future You",
    
    "Remember:\nSuccess is not final, failure is not fatal. It's the courage to continue that counts. Keep pushing forward!",
    
    "Movie Night List:\n✓ The Shawshank Redemption\n✓ Inception\n□ The Godfather\n□ Forrest Gump\n□ The Dark Knight\nCan't wait to watch these classics!",
    
    "Gratitude Journal:\nToday I'm grateful for:\n- My supportive family\n- Good health\n- Wonderful friends\n- A roof over my head\n- This beautiful day",
    
    "New Year Resolutions:\n1. Exercise 4 times a week\n2. Read 24 books this year\n3. Learn a new skill\n4. Travel to 3 new places\n5. Be more present",
    
    "Dear Grandma,\nYour cookies are still the best! No recipe can match them. Thank you for teaching me so many valuable life lessons.\nMiss you, Love you.\nYour favorite grandchild",
    
    "Brainstorming Session:\n• Business idea: Online tutoring platform\n• Target audience: High school students\n• Unique feature: Personalized learning paths\n• Next steps: Market research",
    
    "Favorite Song Lyrics:\n\"You may say I'm a dreamer, but I'm not the only one. I hope someday you'll join us, and the world will live as one.\" - Imagine by John Lennon",
    
    "Things That Made Me Smile Today:\n- Morning coffee\n- A stranger's kindness\n- Beautiful sunset\n- Good music\n- Quality time with family\nLife's simple pleasures!",
    
    "Reflection: One Year Ago\nLooking back, I've grown so much. The challenges shaped me into who I am today. Excited for what's ahead!",
    
    "Dear Universe,\nThank you for another day. Help me be patient, kind, and grateful. Guide me towards my purpose.\nWith hope and faith.",
    
    "Book Club Notes:\nNext meeting: March 15th\nBook: 'Pride and Prejudice'\nDiscussion topics: Character development, historical context\nBring snacks: Everyone contributes!",
    
    "Life Lessons:\n• Be kind, always\n• Listen more, talk less\n• Take risks\n• Forgive quickly\n• Love deeply\n• Live authentically\nWords to live by.",
    
    "The journey of a thousand miles begins with a single step. Today I'm taking that first step towards my dreams!"
];

// ========== INITIALIZE FONTS ==========
function initializeFonts() {
    fontGrid.innerHTML = '';
    fonts.forEach(font => {
        const fontItem = document.createElement('div');
        fontItem.className = `font-item ${font.class} ${font.class === selectedFont ? 'active' : ''}`;
        fontItem.textContent = font.name;
        fontItem.dataset.font = font.class;
        
        fontItem.addEventListener('click', () => {
            document.querySelectorAll('.font-item').forEach(item => item.classList.remove('active'));
            fontItem.classList.add('active');
            selectedFont = font.class;
        });
        
        fontGrid.appendChild(fontItem);
    });
}

// ========== NEW: INITIALIZE INTERACTIVE PAPER SELECTOR ==========
function initializePaperSelector() {
    paperSelector.innerHTML = '';
    
    paperTypes.forEach(paper => {
        const paperCard = document.createElement('div');
        paperCard.className = `paper-card ${paper.id === selectedPaper ? 'active' : ''}`;
        paperCard.dataset.paper = paper.id;
        
        // Create preview canvas
        const preview = document.createElement('canvas');
        preview.className = 'paper-preview';
        preview.width = 300;
        preview.height = 160;
        
        // Draw preview
        drawPaperPreview(preview, paper.id);
        
        const name = document.createElement('div');
        name.className = 'paper-name';
        name.textContent = paper.name;
        
        paperCard.appendChild(preview);
        paperCard.appendChild(name);
        
        paperCard.addEventListener('click', () => {
            document.querySelectorAll('.paper-card').forEach(card => card.classList.remove('active'));
            paperCard.classList.add('active');
            selectedPaper = paper.id;
            showToast(`${paper.icon} ${paper.name} selected!`);
        });
        
        paperSelector.appendChild(paperCard);
    });
}

// ========== DRAW PAPER PREVIEW (Mini version for selector) ==========
function drawPaperPreview(canvas, type) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    
    switch(type) {
        case 'ruled':
            ctx.strokeStyle = '#A5B4C7';
            ctx.lineWidth = 1;
            const spacing = 15;
            for (let y = spacing; y < height; y += spacing) {
                ctx.beginPath();
                ctx.moveTo(10, y);
                ctx.lineTo(width - 10, y);
                ctx.stroke();
            }
            break;
            
        case 'grid':
            const gridSpacing = 15;
            ctx.strokeStyle = '#C5D3E0'; // LIGHTER color
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
            break;
            
        case 'dotted':
            const dotSpacing = 15;
            ctx.fillStyle = '#B0BEC5'; // LIGHTER color
            
            for (let y = dotSpacing; y < height; y += dotSpacing) {
                for (let x = dotSpacing; x < width; x += dotSpacing) {
                    ctx.beginPath();
                    ctx.arc(x, y, 1, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            break;
            
        case 'plain':
            // Already white, nothing to draw
            break;
    }
}

// ========== COLOR PICKER ==========
const colorBoxes = document.querySelectorAll('.color-box');
colorBoxes.forEach(box => {
    box.addEventListener('click', () => {
        colorBoxes.forEach(b => b.classList.remove('active'));
        box.classList.add('active');
        selectedColor = box.dataset.color;
    });
});

// ========== TEXT COUNTER ==========
function updateCounters() {
    const text = textInput.value;
    const chars = text.length;
    const words = text.trim().length > 0 ? text.trim().split(/\s+/).length : 0;
    
    charCount.textContent = `${chars} character${chars !== 1 ? 's' : ''}`;
    wordCount.textContent = `${words} word${words !== 1 ? 's' : ''}`;
}

textInput.addEventListener('input', updateCounters);

// ========== FONT SIZE SLIDER ==========
fontSize.addEventListener('input', (e) => {
    sizeValue.textContent = e.target.value + 'px';
});

// ========== LINE SPACING SLIDER ==========
lineSpacing.addEventListener('input', (e) => {
    spacingValue.textContent = e.target.value;
});

// ========== CLEAR BUTTON ==========
clearBtn.addEventListener('click', () => {
    textInput.value = '';
    updateCounters();
    showToast('Text cleared! 🗑️');
});

// ========== SAMPLE TEXT BUTTON ==========
sampleBtn.addEventListener('click', () => {
    const randomSample = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    textInput.value = randomSample;
    updateCounters();
    showToast('Sample text loaded! 📋');
});

// ========== THEME TOGGLE ==========
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    themeBtn.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    showToast(currentTheme === 'dark' ? 'Dark mode enabled 🌙' : 'Light mode enabled ☀️');
});

// ========== GENERATE HANDWRITING ==========
generateBtn.addEventListener('click', () => {
    const text = textInput.value.trim();
    
    if (!text) {
        showToast('⚠️ Please enter some text first!');
        return;
    }
    
    showLoading(true);
    
    setTimeout(() => {
        generatePages(text);
        showLoading(false);
        showToast('✨ Handwriting generated successfully!');
    }, 500);
});

// ========== GENERATE PAGES WITH PROPER TEXT ALIGNMENT ==========
function generatePages(text) {
    pagesContainer.innerHTML = '';
    emptyState.style.display = 'none';
    pagesContainer.style.display = 'flex';
    downloadBtns.style.display = 'flex';
    
    const charsPerPage = 3000;
    const pages = splitTextIntoPages(text, charsPerPage);
    
    pages.forEach((pageText, index) => {
        const page = createPage(pageText, index + 1, pages.length);
        pagesContainer.appendChild(page);
    });
    
    pagesContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ========== UPDATED: CREATE SINGLE PAGE WITH ALIGNED TEXT ==========
function createPage(text, pageNum, totalPages) {
    const page = document.createElement('div');
    page.className = 'page';
    
    const canvas = document.createElement('canvas');
    canvas.className = 'page-lines-canvas';
    
    const pageWidth = 794;
    const pageHeight = 1123;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
    
    // Draw paper lines
    drawPaperLines(canvas, selectedPaper);
    
    const content = document.createElement('div');
    content.className = `page-content ${selectedFont}`;
    content.textContent = text;
    
    // CRITICAL: Set line height to match paper line spacing
    const userFontSize = parseInt(fontSize.value);
    const lineHeight = selectedPaper === 'ruled' ? 30 : parseFloat(lineSpacing.value) * userFontSize;
    
    content.style.fontSize = userFontSize + 'px';
    content.style.lineHeight = lineHeight + 'px';
    content.style.color = selectedColor;
    
    // CRITICAL: Align first line with first rule
    if (selectedPaper === 'ruled') {
        content.style.paddingTop = '50px'; // Matches first line position
    } else {
        content.style.paddingTop = '40px';
    }
    
    if (totalPages > 1) {
        const pageNumber = document.createElement('div');
        pageNumber.className = 'page-number';
        pageNumber.textContent = `Page ${pageNum} of ${totalPages}`;
        page.appendChild(pageNumber);
    }
    
    page.appendChild(canvas);
    page.appendChild(content);
    
    return page;
}

// ========== UPDATED: DRAW REALISTIC NOTEBOOK LINES (Only 4 types, lighter grid/dotted) ==========
function drawPaperLines(canvas, type) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    
    switch(type) {
        case 'ruled':
            ctx.strokeStyle = '#A5B4C7';
            ctx.lineWidth = 1.5;
            const ruledSpacing = 30; // Matches CSS line-height
            const ruledStartY = 50; // Matches CSS padding-top
            
            for (let y = ruledStartY; y < height - 40; y += ruledSpacing) {
                ctx.beginPath();
                ctx.moveTo(40, y);
                ctx.lineTo(width - 40, y);
                ctx.stroke();
            }
            break;
            
        case 'grid':
            const gridSpacing = 20;
            ctx.strokeStyle = '#C5D3E0'; // LIGHTER color (was #95A5A6)
            ctx.lineWidth = 0.8; // Thinner lines
            
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
            break;
            
        case 'dotted':
            const dotSpacing = 25;
            ctx.fillStyle = '#B0BEC5'; // LIGHTER color (was #7F8C8D)
            
            for (let y = dotSpacing; y < height; y += dotSpacing) {
                for (let x = dotSpacing; x < width; x += dotSpacing) {
                    ctx.beginPath();
                    ctx.arc(x, y, 1.2, 0, Math.PI * 2); // Slightly smaller dots
                    ctx.fill();
                }
            }
            break;
            
        case 'plain':
            // Nothing to draw - plain white
            break;
    }
}

// ========== SPLIT TEXT INTO PAGES ==========
function splitTextIntoPages(text, charsPerPage) {
    const pages = [];
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
    
    return pages.length > 0 ? pages : [text];
}

// ========== DOWNLOAD PNG ==========
downloadPNG.addEventListener('click', async () => {
    showLoading(true);
    
    try {
        const pages = document.querySelectorAll('.page');
        
        if (pages.length === 0) {
            showToast('⚠️ No pages to download!');
            showLoading(false);
            return;
        }
        
        const page = pages[0];
        
        const canvas = await html2canvas(page, {
            scale: 2,
            useCORS: true,
            allowTaint: false,
            backgroundColor: '#ffffff',
            width: page.offsetWidth,
            height: page.offsetHeight,
            windowWidth: page.scrollWidth,
            windowHeight: page.scrollHeight
        });
        
        const link = document.createElement('a');
        link.download = `handwriting-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        showToast('✅ PNG downloaded successfully!');
    } catch (error) {
        console.error('PNG Download Error:', error);
        showToast('❌ Download failed. Please try again.');
    } finally {
        showLoading(false);
    }
});

// ========== DOWNLOAD PDF ==========
downloadPDF.addEventListener('click', async () => {
    showLoading(true);
    
    try {
        const pages = document.querySelectorAll('.page');
        
        if (pages.length === 0) {
            showToast('⚠️ No pages to download!');
            showLoading(false);
            return;
        }
        
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        for (let i = 0; i < pages.length; i++) {
            const page = pages[i];
            
            const canvas = await html2canvas(page, {
                scale: 2,
                useCORS: true,
                allowTaint: false,
                backgroundColor: '#ffffff',
                width: page.offsetWidth,
                height: page.offsetHeight,
                windowWidth: page.scrollWidth,
                windowHeight: page.scrollHeight
            });
            
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210;
            const imgHeight = 297;
            
            if (i > 0) {
                pdf.addPage();
            }
            
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        }
        
        pdf.save(`handwriting-${Date.now()}.pdf`);
        showToast(`✅ PDF downloaded! (${pages.length} page${pages.length > 1 ? 's' : ''})`);
        
    } catch (error) {
        console.error('PDF Download Error:', error);
        showToast('❌ PDF generation failed. Please try again.');
    } finally {
        showLoading(false);
    }
});

// ========== SHOW LOADING ==========
function showLoading(show) {
    loadingOverlay.style.display = show ? 'flex' : 'none';
}

// ========== SHOW TOAST ==========
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ========== INITIALIZE ON PAGE LOAD ==========
document.addEventListener('DOMContentLoaded', () => {
    initializeFonts();
    initializePaperSelector();
    updateCounters();
    console.log('✍️ TextToHand - Ready with 70 fonts and 4 paper styles!');
});