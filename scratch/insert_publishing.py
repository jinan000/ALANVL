
publishing_block = '''
                <!-- GLOBAL PUBLISHING & MEDIA RIGHTS -->
                <div style="padding: 4rem 0; border-top: 1px solid rgba(255,255,255,0.04); border-bottom: 1px solid rgba(255,255,255,0.04); margin-top: 3rem;">
                    <div class="text-center animate-up">
                        <p
                            style="font-family: 'Space Mono', monospace; font-size: 0.75rem; letter-spacing: 0.25em; color: var(--gold); text-transform: uppercase; margin-bottom: 0.75rem;">
                            [ GLOBAL PUBLISHING &amp; MEDIA RIGHTS ]</p>
                        <p
                            style="font-family: 'Inter', sans-serif; font-size: 0.95rem; color: rgba(255,255,255,0.55); max-width: 700px; margin: 0 auto 2.5rem;">
                            The Intellectual Property (IP) of Dr. Alan V.L. is now open for international acquisition and
                            regional licensing.</p>

                        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 2.5rem;">
                            <span class="btn-ghost"
                                style="pointer-events: none; border-color: rgba(197,160,89,0.3); color: var(--gold);">[ \U0001f30d
                                GLOBAL ENGLISH RIGHTS: OPEN ]</span>
                            <span class="btn-ghost"
                                style="pointer-events: none; border-color: rgba(197,160,89,0.3); color: var(--gold);">[ \U0001f5fa\ufe0f
                                REGIONAL LANGUAGE TRANSLATIONS: OPEN ]</span>
                            <span class="btn-ghost"
                                style="pointer-events: none; border-color: rgba(197,160,89,0.3); color: var(--gold);">[ \U0001f3ac AUDIO
                                RIGHTS: OPEN ]</span>
                        </div>

                        <p
                            style="font-family: 'Space Mono', monospace; font-size: 0.65rem; letter-spacing: 0.15em; color: rgba(255,255,255,0.35); text-transform: uppercase; margin-bottom: 0.75rem;">
                            FOR DIRECT NEGOTIATIONS &amp; ACQUISITION ENQUIRIES:</p>
                        <a href="mailto:hi@alanvl.com"
                            style="font-family: 'Inter', sans-serif; font-size: 1rem; font-weight: 600; color: #fff; text-decoration: none; letter-spacing: 0.05em; transition: color 0.3s ease;">\U0001f4e7
                            hi@alanvl.com</a>
                    </div>
                </div>
'''

# === 1. Insert into index.html after bonus cards (before arsenal-continuation) ===
with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

marker1 = '</div> <!-- CLOSE arsenal-grid-premium -->'
idx1 = text.find(marker1)
if idx1 != -1:
    insert_pos = idx1 + len(marker1)
    text = text[:insert_pos] + '\n' + publishing_block + '\n' + text[insert_pos:]
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(text)
    print("SUCCESS: Inserted into index.html after bonus cards")
else:
    print("ERROR: Could not find arsenal-grid-premium close marker in index.html")

# === 2. Insert into explore-more-books.html after 4 regular cards ===
with open('explore-more-books.html', 'r', encoding='utf-8') as f:
    text2 = f.read()

marker2 = '</div> <!-- end arsenal-regular-grid -->'
idx2 = text2.find(marker2)
if idx2 != -1:
    insert_pos2 = idx2 + len(marker2)
    text2 = text2[:insert_pos2] + '\n' + publishing_block + '\n' + text2[insert_pos2:]
    with open('explore-more-books.html', 'w', encoding='utf-8') as f:
        f.write(text2)
    print("SUCCESS: Inserted into explore-more-books.html after regular cards")
else:
    print("ERROR: Could not find regular-grid close marker in explore-more-books.html")
