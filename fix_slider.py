import re

with open('script.js', 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'(const slidesData = \[.*?\n\s+\];)\n', content, re.DOTALL)

if match:
    old_slides_data = match.group(1)
    new_slides_data = '''const slidesData = [
            {
                title: "NSMU <br/>Case Files",
                status: "Clinical Foundation",
                image: "images/teaching_medical_students.jpeg"
            },
            {
                title: "Medmelo <br/>Learning",
                status: "Digital Education",
                image: "images/nsmu_mentorship.jpeg"
            },
            {
                title: "Strategic <br/>Intelligence",
                status: "Global Authority",
                image: "images/learn.jpeg"
            }
        ];'''
    
    new_content = content.replace(old_slides_data, new_slides_data)
    with open('script.js', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Replaced slidesData successfully.")
else:
    print("Could not find slidesData array.")
