with open('explore-more-books.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

more_from_medmelo = lines[:270] + lines[1318:]
explore_more_books = lines[:45] + lines[270:]

with open('MORE-FROM-MEDMELO.html', 'w', encoding='utf-8') as f:
    f.writelines(more_from_medmelo)

with open('explore-more-books.html', 'w', encoding='utf-8') as f:
    f.writelines(explore_more_books)

with open('index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

index_content = index_content.replace('<a href="explore-more-books.html" class="btn-ecosystem-more">', '<a href="MORE-FROM-MEDMELO.html" class="btn-ecosystem-more">')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(index_content)
    
print('Done!')
