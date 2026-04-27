import os

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update id="about" to id="origin"
content = content.replace('id="about"', 'id="origin"')

# 2. Update logo div to a link
content = content.replace('<div class="logo">ALAN V.L</div>', '<a href="#journey" class="logo" style="text-decoration:none;color:inherit;cursor:pointer;">ALAN V.L</a>')

# 3. Add smooth scroll logic
script_injection = """
<!-- Navigation Script injected automatically -->
<script>
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                if (typeof lenis !== 'undefined') {
                    lenis.scrollTo(targetElement, { duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
                } else {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});
</script>
"""

if 'Navigation Script injected automatically' not in content:
    content = content.replace('</body>', script_injection + '\n</body>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated index.html headers and logos")
