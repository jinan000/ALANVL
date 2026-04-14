import glob
import sys

sys.stdout.reconfigure(encoding='utf-8')

def find_mojibake():
    files = glob.glob('*.html')
    targets = ['â', 'Ã', 'Â', 'œ', '™']
    
    found = False
    for filename in files:
        if 'backup' in filename: continue
        with open(filename, 'r', encoding='utf-8') as f:
            for i, line in enumerate(f):
                # Malayalam text has native characters that might clash in terminal output, but we only flag if the exact mojibake substring is found
                for t in targets:
                    if t in line:
                        # Exclude 'Malayalam' explicitly as Malayalam characters don't contain these latin mojibakes
                        print(f"{filename}:{i+1}: {line.strip()}")
                        found = True
                        break

    if not found:
        print("WORKSPACE CLEAN: No localized mojibake strings detected.")

if __name__ == "__main__":
    find_mojibake()
