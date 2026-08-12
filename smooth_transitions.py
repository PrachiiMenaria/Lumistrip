import os
import re

src_dir = r"c:\Users\BAPS\lumistrip\src"

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # 1. Update Framer Motion spring transitions
    content = re.sub(r'stiffness:\s*\d+', 'stiffness: 80', content)
    content = re.sub(r'damping:\s*\d+', 'damping: 20', content)
    content = re.sub(r'mass:\s*[\d\.]+', 'mass: 1', content)
    
    # Increase short Framer Motion durations
    def replace_duration(m):
        try:
            val = float(m.group(1))
            if val < 0.6:
                return f"duration: 0.6"
            return m.group(0)
        except:
            return m.group(0)
    
    content = re.sub(r'duration:\s*([\d\.]+)', replace_duration, content)

    # 2. Update Tailwind CSS classes
    content = re.sub(r'duration-(?:75|100|150|200|300)', 'duration-500', content)
    # ease-out, ease-in -> ease-in-out
    # We use lookbehind and lookahead so we don't accidentally match part of another class
    content = re.sub(r'\bease-(?:out|in|linear)\b', 'ease-in-out', content)

    # 3. FloatingElements speeds (react-three/drei)
    if 'FloatingElements' in filepath:
        def replace_speed(m):
            try:
                val = float(m.group(1))
                return f"speed={{{val * 0.5:.2f}}}"
            except:
                return m.group(0)
        content = re.sub(r'speed={([\d\.]+)}', replace_speed, content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, _, files in os.walk(src_dir):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.jsx', '.js', '.css')):
            process_file(os.path.join(root, file))
