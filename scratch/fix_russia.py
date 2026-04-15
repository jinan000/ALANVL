import re

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Find the right column content between the markers
old_start = '<!-- Right Column (70% visual weight) -->'
old_end_marker = '</div>\n                </div>'

# Find the russia-backstory section first
section_start = text.find('id="russia-backstory"')
if section_start == -1:
    print("ERROR: russia-backstory section not found")
    exit()

# Find the right column within this section
right_col_start = text.find(old_start, section_start)
if right_col_start == -1:
    print("ERROR: Right column not found")
    exit()

# Find the closing </div> for the right column (flex: 2.5 div)
# After the right column content, we need to find </div> that closes it
# Then </div> that closes the flex wrapper
right_col_end = text.find('</div>\n                </div>\n\n            </div>\n        </section>', right_col_start)
if right_col_end == -1:
    # Try with \r\n
    right_col_end = text.find('</div>\r\n                </div>\r\n\r\n            </div>\r\n        </section>', right_col_start)

if right_col_end == -1:
    print("ERROR: Could not find end of right column")
    exit()

print(f"Found right column at positions {right_col_start} to {right_col_end}")

new_right = '''<!-- Right Column (70% visual weight) -->
                    <div style="flex: 2.5; min-width: 300px;">
                        <h5
                            style="font-family: 'Space Mono', monospace; font-size: 0.8rem; letter-spacing: 0.2em; color: var(--gold); text-transform: uppercase; margin-bottom: 1.5rem; opacity: 0.8;">
                            THE ULTIMATE LINGUISTIC CHALLENGE
                        </h5>
                        <p
                            style="font-family: 'Inter', sans-serif; font-size: 1.15rem; color: rgba(255,255,255,0.8); line-height: 1.8; margin-bottom: 2rem; font-weight: 300;">
                            When you step onto a global stage, you are faced with a choice: play it safe, or take absolute control.
                        </p>
                        <p
                            style="font-family: 'Inter', sans-serif; font-size: 1.15rem; color: rgba(255,255,255,0.8); line-height: 1.8; margin-bottom: 2rem; font-weight: 300;">
                            At the <em style="color: #fff;">International Spring</em> intercultural festival in Russia, I stood before a massive native audience as an international author and speaker. It would have been incredibly easy for me to deliver my keynote in English or my mother tongue. That is the standard, comfortable protocol for most international speakers.
                        </p>
                        <p
                            style="font-family: 'Inter', sans-serif; font-size: 1.15rem; color: rgba(255,255,255,0.8); line-height: 1.8; margin-bottom: 2rem; font-weight: 300;">
                            But <strong style="color: #fff; font-weight: 500;">true leaders don\u2019t seek comfort; they seek friction.</strong>
                        </p>
                        <p
                            style="font-family: 'Inter', sans-serif; font-size: 1.15rem; color: rgba(255,255,255,0.8); line-height: 1.8; margin-bottom: 2rem; font-weight: 300;">
                            I completely discarded the safety net of translation. Instead, I took on the ultimate psychological and linguistic challenge: delivering my entire keynote <strong style="color: #fff; font-weight: 500;">completely in native Russian.</strong>
                        </p>
                        <p
                            style="font-family: 'Inter', sans-serif; font-size: 1.15rem; color: rgba(255,255,255,0.8); line-height: 1.8; margin-bottom: 2rem; font-weight: 300;">
                            Standing before them, I stripped away every cultural and linguistic barrier. I didn\u2019t just speak to the audience; I <strong style="color: #fff; font-weight: 500;">commanded the room in their own language.</strong> I looked into their eyes and delivered one raw, unfiltered truth:
                        </p>

                        <!-- Keynote Quote -->
                        <p
                            style="font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; color: #fff; line-height: 1.6; margin-bottom: 2.5rem; font-weight: 600; padding: 2rem 0; border-top: 1px solid rgba(255,255,255,0.08); border-bottom: 1px solid rgba(255,255,255,0.08); text-align: center; font-style: italic;">
                            \u201cIt is never too late to forge your destiny.\u201d
                        </p>

                        <p
                            style="font-family: 'Inter', sans-serif; font-size: 1.15rem; color: rgba(255,255,255,0.8); line-height: 1.8; margin-bottom: 2rem; font-weight: 300;">
                            This wasn\u2019t just a speech. It was a <strong style="color: #fff; font-weight: 500;">masterclass in cross-cultural authority.</strong> When you refuse the easy path and deliver raw conviction in the exact language of your listeners, you don\u2019t just win their applause\u2014you <strong style="color: var(--gold); font-weight: 500;">conquer their minds.</strong>
                        </p>

                        <!-- Closing Statement -->
                        <p
                            style="font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; color: rgba(255,255,255,0.5); line-height: 1.7; font-style: italic; font-weight: 300; margin-top: 1rem;">
                            The stage is no longer just a platform. It is an empire waiting to be claimed.
                        </p>
                    </div>'''

# Replace from right_col_start to right_col_end (exclusive, keeping the closing divs)
text = text[:right_col_start] + new_right + text[right_col_end:]

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("SUCCESS: Right column updated")
