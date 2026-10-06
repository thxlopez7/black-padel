import os
import re

emoji_pattern = re.compile(
    r'[\U00010000-\U0010ffff]',
    flags=re.UNICODE
)

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.js') or file.endswith('.jsx'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                lines = f.readlines()
                for i, line in enumerate(lines):
                    if emoji_pattern.search(line):
                        print(f"{path}:{i+1}:{line.strip()}")
