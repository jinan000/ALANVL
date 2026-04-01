import sys
content = ""
try:
    with open('index.html', 'r', encoding='utf-8') as f:
        lines = f.readlines()
except UnicodeDecodeError:
    with open('index.html', 'r', encoding='utf-16') as f:
        lines = f.readlines()

for i, line in enumerate(lines):
    if 'logo' in line.lower() and ('track' in line.lower() or 'loop' in line.lower() or 'finance' in line.lower() or 'harvard' in line.lower()):
        print(f"{i+1}: {line.strip()}")
