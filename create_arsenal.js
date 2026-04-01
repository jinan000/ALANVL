const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

// Extract head and nav
const headMatch = index.match(/<head>[\s\S]*?<\/head>/i)[0];
const navMatch = index.match(/<header class="site-header">[\s\S]*?<\/header>/i)[0];
const footerMatch = index.match(/<footer class="section footer"[\s\S]*?<\/footer>/i)[0];

const headUpdated = headMatch.replace('<title>Initiation - The Author</title>', '<title>The Arsenal - Global Intelligence</title>');
const navUpdated = navMatch.replace(/href="#/g, 'href="index.html#');

const styleUpdates = 
/* --- THE ARSENAL GRID SYSTEM --- */
.arsenal-page {
    padding-top: 150px;
    background: var(--bg-dark, #020202);
    min-height: 100vh;
}

.hero-quote {
    font-size: 2rem;
    line-height: 1.6;
    color: var(--text-primary);
    max-width: 800px;
    margin: 0 auto 5rem;
}

.hero-quote .dramatic-pause {
    display: block;
    font-style: italic;
    opacity: 0.9;
    font-size: 2.2rem;
    margin: 4rem 0;
}

.hero-quote .golden-highlight {
    color: var(--bg-dark, #020202);
    background: linear-gradient(120deg, #FFD700, #B8860B);
    padding: 0.1rem 0.6rem;
    font-weight: 700;
}

.arsenal-category-title {
    font-family: 'Space Mono', monospace;
    font-size: 1rem;
    letter-spacing: 0.25em;
    color: var(--gold);
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 3rem;
    border-bottom: 1px solid rgba(255,215,0,0.2);
    padding-bottom: 1rem;
}

.arsenal-category-subtitle {
    text-align: center;
    font-style: italic;
    color: var(--text-secondary);
    margin-top: -2rem;
    margin-bottom: 4rem;
}

.arsenal-grid {
    display: grid;
    gap: 3rem;
    margin-bottom: 6rem;
}

.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
.grid-cols-5 { grid-template-columns: repeat(5, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-6 { grid-template-columns: repeat(6, 1fr); }

@media (max-width: 992px) {
    .grid-cols-4, .grid-cols-5, .grid-cols-6 { grid-template-columns: repeat(2, 1fr); }
    .grid-cols-3 { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
    .grid-cols-2, .grid-cols-4, .grid-cols-5, .grid-cols-6 { grid-template-columns: 1fr; }
}

.arsenal-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.arsenal-logo-container {
    height: 80px;
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    filter: drop-shadow(0 4px 15px rgba(255,255,255,0.05));
    transition: filter 0.3s ease, transform 0.3s ease;
}

.arsenal-logo-container:hover {
    transform: translateY(-5px);
    filter: drop-shadow(0 8px 25px rgba(255,255,255,0.1));
}

.arsenal-logo-container img, .arsenal-logo-container svg {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
}

.arsenal-logo-container.grayscale {
    filter: grayscale(100%) opacity(0.8) drop-shadow(0 4px 15px rgba(255,255,255,0.05));
}
.arsenal-logo-container.grayscale:hover {
    filter: grayscale(0%) opacity(1) drop-shadow(0 8px 25px rgba(255,255,255,0.1));
}

.app-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 1.1rem;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
}

.micro-skill {
    font-family: 'Inter', sans-serif;
    font-weight: 300;
    font-style: italic;
    font-size: 0.85rem;
    color: var(--text-secondary);
    line-height: 1.4;
}

.creative-sub-category {
    margin-bottom: 5rem;
}

.creative-sub-category h4 {
    font-family: 'Space Mono', monospace;
    font-size: 0.85rem;
    letter-spacing: 0.15em;
    color: var(--text-primary);
    text-align: center;
    margin-bottom: 0.5rem;
}

.creative-sub-category .sub-desc {
    text-align: center;
    font-style: italic;
    color: var(--text-secondary);
    margin-bottom: 3rem;
    font-size: 0.9rem;
}
;

fs.appendFileSync('style.css', styleUpdates);

const adobeSvg = (text, color1, color2) => \<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="20" fill="\"/><text x="50" y="65" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="45" fill="\" text-anchor="middle">\</text></svg>\;
const genericSvg = (initials, bg) => \<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="\"/><text x="50" y="65" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="40" fill="#ffffff" text-anchor="middle">\</text></svg>\;

const content = \<!DOCTYPE html>
<html lang="en">
\
<body>
    <div class="noise-overlay"></div>
    \

    <main class="smooth-scroll-wrapper arsenal-page">
        <!-- HERO QUOTE SECTION -->
        <section class="section">
            <div class="container text-center animate-up">
                <p class="hero-quote font-heading">
                    “Becoming a doctor was never my dream.<br>
                    In fact, it was the last thing I wanted to be.<br>
                    I was the kid who used to faint at the sight of blood.<br>
                    
                    <span class="dramatic-pause">Yet, here I am.</span>

                    With the right mindset, you don't just find your destiny <span class="golden-highlight">— you build it.</span>”
                </p>
            </div>
        </section>

        <!-- 01 : THE CLINICAL INTELLIGENCE -->
        <section class="section">
            <div class="container">
                <h3 class="arsenal-category-title">[ 01 : THE CLINICAL INTELLIGENCE ]</h3>
                <p class="arsenal-category-subtitle">(To showcase clinical authority through world-leading universities and institutions)</p>
                
                <div class="arsenal-grid grid-cols-6 animate-up">
                    <div class="arsenal-card">
                        <div class="arsenal-logo-container"><img src="images/harvard.png" alt="Harvard"></div>
                        <h4 class="app-title">Harvard Medical School</h4>
                        <p class="micro-skill">Prostate diseases & erectile dysfunction</p>
                    </div>
                    <div class="arsenal-card">
                        <div class="arsenal-logo-container"><img src="images/yale.png" alt="Yale"></div>
                        <h4 class="app-title">Yale University</h4>
                        <p class="micro-skill">Visualising the Living Body: Diagnostic imaging</p>
                    </div>
                    <div class="arsenal-card">
                        <div class="arsenal-logo-container"><img src="images/johns.png" alt="Johns Hopkins"></div>
                        <h4 class="app-title">Johns Hopkins University</h4>
                        <p class="micro-skill">Investigating epidemics like Covid-19</p>
                    </div>
                    <div class="arsenal-card">
                        <div class="arsenal-logo-container"><img src="images/stanford.png" alt="Stanford"></div>
                        <h4 class="app-title">Stanford University</h4>
                        <p class="micro-skill">International Women’s Health and Human Rights</p>
                    </div>
                    <div class="arsenal-card">
                        <div class="arsenal-logo-container"><img src="images/iarc.png" alt="AHA"></div>
                        <h4 class="app-title">AHA</h4>
                        <p class="micro-skill">ACLS Prep: ECG & Pharmacology</p>
                    </div>
                    <div class="arsenal-card">
                        <div class="arsenal-logo-container"><img src="images/who.png" alt="WHO & IARC"></div>
                        <h4 class="app-title">WHO & IARC</h4>
                        <p class="micro-skill">Basic Emergency Care, Mass Casualty Management, Covid-19 and Cancer Screening</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 02 : THE FINANCIAL ARCHITECTURE -->
        <section class="section">
            <div class="container">
                <h3 class="arsenal-category-title">[ 02 : THE FINANCIAL ARCHITECTURE ]</h3>
                <p class="arsenal-category-subtitle">(Healthcare business and revenue modeling)</p>
                
                <div class="arsenal-grid grid-cols-3 animate-up">
                    <div class="arsenal-card">
                        <div class="arsenal-logo-container">\</div>
                        <h4 class="app-title">New York Institute of Finance (NYIF)</h4>
                        <p class="micro-skill">Corporate Finance & Business Valuation<br>(Relevance: Strategic planning and valuation of medical services)</p>
                    </div>
                    <div class="arsenal-card">
                        <div class="arsenal-logo-container">\</div>
                        <h4 class="app-title">National Stock Exchange (NSE Academy)</h4>
                        <p class="micro-skill">Professional Certification in Financial Planning & Management<br>(Core competencies: Corporate Finance, Financial Statement Analysis, Wealth Management)</p>
                    </div>
                    <div class="arsenal-card">
                        <div class="arsenal-logo-container">\</div>
                        <h4 class="app-title">DeakinCo. Australia</h4>
                        <p class="micro-skill">Financial Modelling & Data Analytics</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 03 : THE DATA COMMAND CENTER -->
        <section class="section">
            <div class="container">
                <h3 class="arsenal-category-title">[ 03 : THE DATA COMMAND CENTER ]</h3>
                <p class="arsenal-category-subtitle">(Capability to digitally manage hospital dashboards and quality reporting)</p>
                
                <div class="arsenal-grid grid-cols-4 animate-up">
                    <div class="arsenal-card">
                        <div class="arsenal-logo-container">\</div>
                        <h4 class="app-title">Microsoft Power BI & Tableau</h4>
                        <p class="micro-skill">Advanced proficiency in creating clinical dashboards and quality reporting</p>
                    </div>
                    <div class="arsenal-card">
                        <div class="arsenal-logo-container">\</div>
                        <h4 class="app-title">Advanced SQL</h4>
                        <p class="micro-skill">Healthcare database management</p>
                    </div>
                    <div class="arsenal-card">
                        <div class="arsenal-logo-container">\</div>
                        <h4 class="app-title">Advanced MS Excel</h4>
                        <p class="micro-skill">Mastery of financial modeling</p>
                    </div>
                    <div class="arsenal-card">
                        <div class="arsenal-logo-container">\</div>
                        <h4 class="app-title">Advanced MS PowerPoint</h4>
                        <p class="micro-skill">Mastery of executive presentations</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 04 : THE CREATIVE ENGINE -->
        <section class="section">
            <div class="container">
                <h3 class="arsenal-category-title">[ 04 : THE CREATIVE ENGINE (Self-Learned) ]</h3>
                <p class="arsenal-category-subtitle">(The arsenal used to build brands and design UX independently)</p>

                <!-- Cinematic Studio -->
                <div class="creative-sub-category animate-up">
                    <h4>?? THE CINEMATIC STUDIO</h4>
                    <p class="sub-desc">(Video Production & Motion Dynamics)</p>
                    <div class="arsenal-grid grid-cols-4">
                        <div class="arsenal-card">
                            <div class="arsenal-logo-container grayscale">\</div>
                            <h4 class="app-title">Final Cut Pro X</h4>
                            <p class="micro-skill">Cinematic Editing</p>
                        </div>
                        <div class="arsenal-card">
                            <div class="arsenal-logo-container grayscale">\</div>
                            <h4 class="app-title">DaVinci Resolve</h4>
                            <p class="micro-skill">Color Grading</p>
                        </div>
                        <div class="arsenal-card">
                            <div class="arsenal-logo-container grayscale">\</div>
                            <h4 class="app-title">Adobe Premiere</h4>
                            <p class="micro-skill">Timeline Mastery</p>
                        </div>
                        <div class="arsenal-card">
                            <div class="arsenal-logo-container grayscale">\</div>
                            <h4 class="app-title">After Effects</h4>
                            <p class="micro-skill">Motion Graphics</p>
                        </div>
                    </div>
                </div>

                <!-- Visual & Branding -->
                <div class="creative-sub-category animate-up">
                    <h4>?? THE VISUAL & BRANDING ARSENAL</h4>
                    <p class="sub-desc">(Vector Design, Typography & Compositing)</p>
                    <div class="arsenal-grid grid-cols-4" style="margin-bottom: 2rem;">
                        <div class="arsenal-card">
                            <div class="arsenal-logo-container grayscale">\</div>
                            <h4 class="app-title">Adobe Photoshop</h4>
                            <p class="micro-skill">Image Compositing</p>
                        </div>
                        <div class="arsenal-card">
                            <div class="arsenal-logo-container grayscale">\</div>
                            <h4 class="app-title">Pixelmator Pro</h4>
                            <p class="micro-skill">ML-Powered Edits</p>
                        </div>
                        <div class="arsenal-card">
                            <div class="arsenal-logo-container grayscale">\</div>
                            <h4 class="app-title">Adobe Illustrator</h4>
                            <p class="micro-skill">Vector Architecture</p>
                        </div>
                        <div class="arsenal-card">
                            <div class="arsenal-logo-container grayscale">\</div>
                            <h4 class="app-title">Adobe Lightroom</h4>
                            <p class="micro-skill">RAW Color Science</p>
                        </div>
                    </div>
                    <div class="arsenal-grid grid-cols-2" style="max-width: 600px; margin: 0 auto;">
                        <div class="arsenal-card">
                            <div class="arsenal-logo-container grayscale">\</div>
                            <h4 class="app-title">Canva</h4>
                            <p class="micro-skill">Rapid Asset Design</p>
                        </div>
                        <div class="arsenal-card">
                            <div class="arsenal-logo-container grayscale">\</div>
                            <h4 class="app-title">Phonto</h4>
                            <p class="micro-skill">Custom Typography</p>
                        </div>
                    </div>
                </div>

                <!-- Audio Architecture -->
                <div class="creative-sub-category animate-up">
                    <h4>??? THE AUDIO ARCHITECTURE</h4>
                    <p class="sub-desc">(Sound mixing & podcast mastering)</p>
                    <div class="arsenal-grid grid-cols-1" style="max-width: 300px; margin: 0 auto;">
                        <div class="arsenal-card">
                            <div class="arsenal-logo-container grayscale">\</div>
                            <h4 class="app-title">Logic Pro</h4>
                            <p class="micro-skill">Professional Sound Design</p>
                        </div>
                    </div>
                </div>

                <!-- Corporate Command Center -->
                <div class="creative-sub-category animate-up">
                    <h4>?? THE CORPORATE COMMAND CENTER</h4>
                    <p class="sub-desc">(Executive pitching, data modeling & documentation)</p>
                    <div class="arsenal-grid grid-cols-5">
                        <div class="arsenal-card">
                            <div class="arsenal-logo-container grayscale">\</div>
                            <h4 class="app-title">MS PowerPoint</h4>
                            <p class="micro-skill">Investor Pitching</p>
                        </div>
                        <div class="arsenal-card">
                            <div class="arsenal-logo-container grayscale">\</div>
                            <h4 class="app-title">Apple Keynote</h4>
                            <p class="micro-skill">Executive Decks</p>
                        </div>
                        <div class="arsenal-card">
                            <div class="arsenal-logo-container grayscale">\</div>
                            <h4 class="app-title">MS Excel</h4>
                            <p class="micro-skill">Financial Modeling</p>
                        </div>
                        <div class="arsenal-card">
                            <div class="arsenal-logo-container grayscale">\</div>
                            <h4 class="app-title">Apple Numbers</h4>
                            <p class="micro-skill">Data Tracking</p>
                        </div>
                        <div class="arsenal-card">
                            <div class="arsenal-logo-container grayscale">\</div>
                            <h4 class="app-title">Apple Pages</h4>
                            <p class="micro-skill">Corporate Docs</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        \
    </main>

    <script src="script.js"></script>
</body>
</html>\;

fs.writeFileSync('arsenal.html', content);
console.log('arsenal.html perfectly populated.');
