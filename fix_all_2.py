import glob

def fix_mojibake():
    files = glob.glob('*.html')
    
    replacements = {
        'â‚¹': '₹',
        'â”€': '─'
    }

    for filename in files:
        if 'backup' in filename: continue
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
            
        modified = False
        for bad, good in replacements.items():
            if bad in content:
                content = content.replace(bad, good)
                modified = True
                
        if modified:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Fixed mojibake in {filename}")

if __name__ == "__main__":
    fix_mojibake()
