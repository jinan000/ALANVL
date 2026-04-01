import base64
import re
import os

images_to_encode = [
    'images/teaching_medical_students.jpeg',
    'images/nsmu_mentorship.jpeg',
    'images/learn.jpeg'
]

b64_strings = []
for img_path in images_to_encode:
    with open(img_path, 'rb') as f:
        encoded = base64.b64encode(f.read()).decode('utf-8')
        extension = img_path.split('.')[-1]
        b64_strings.append(f'data:image/{extension};base64,{encoded}')

with open('script.js', 'r', encoding='utf-8') as f:
    content = f.read()

# We replace the file paths back to base64
match = re.search(r'(const slidesData = \[.*?\n\s+\];)\n', content, re.DOTALL)

if match:
    old_slides_data = match.group(1)
    new_slides_data = f'''const slidesData = [
            {{
                title: "NSMU <br/>Case Files",
                status: "Clinical Foundation",
                image: "{b64_strings[0]}"
            }},
            {{
                title: "Medmelo <br/>Learning",
                status: "Digital Education",
                image: "{b64_strings[1]}"
            }},
            {{
                title: "Strategic <br/>Intelligence",
                status: "Global Authority",
                image: "{b64_strings[2]}"
            }}
        ];'''
    
    new_content = content.replace(old_slides_data, new_slides_data)
    with open('script.js', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Converted images to base64 and injected back into script.")
else:
    print("Could not find slidesData array.")

