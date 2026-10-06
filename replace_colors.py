import os
import re

def update_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Color swaps
    content = content.replace('cyan-400', 'red-500')
    content = content.replace('cyan-500', 'red-600')
    content = content.replace('cyan-600', 'red-700')
    content = content.replace('cyan-800', 'red-900')
    content = content.replace('cyan-900', 'red-950')
    
    content = content.replace('emerald-400', 'gray-300')
    content = content.replace('emerald-500', 'white')
    content = content.replace('emerald-800', 'gray-700')
    content = content.replace('emerald-900', 'gray-800')

    content = content.replace('purple-400', 'red-400')
    content = content.replace('purple-500', 'red-500')

    # Brand text
    content = content.replace('COPA <span className="text-cyan-400 font-bold">PRIMAVERA</span>', '<img src="/logo.png" alt="Black Club" className="h-10 w-auto" />')
    content = content.replace('COPA <span className="text-red-500 font-bold">PRIMAVERA</span>', '<img src="/logo.png" alt="Black Club" className="h-10 w-auto" />')
    content = content.replace('Flyer Copa Primavera', 'Flyer Black Padel')
    content = content.replace('/flyer.jpg', '/flyer.png')
    content = content.replace('Dashboard General de Copa Primavera', 'Dashboard General - Circuito Black Pádel')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.js') or file.endswith('.jsx'):
            update_file(os.path.join(root, file))

print("Done replacing.")
