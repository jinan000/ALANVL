import os
import glob

def find_mojibake():
    files = glob.glob('*.html') + glob.glob('*.js')
    mojibakes = ['Ã', 'â€', 'â€™', 'â€”', 'â€œ', 'â€', 'Â']
    
    found_any = False
    for filename in files:
        if filename == 'index_backup.html':
            continue
        try:
            with open(filename, 'r', encoding='utf-8') as f:
                lines = f.readlines()
            for i, line in enumerate(lines):
                for m in mojibakes:
                    if m in line:
                        print(f"{filename}:{i+1}: {line.strip()}")
                        found_any = True
                        break
        except Exception as e:
            pass
            # print(f"Error reading {filename}: {e}")

    if not found_any:
        print("No mojibake found!")

if __name__ == "__main__":
    find_mojibake()
