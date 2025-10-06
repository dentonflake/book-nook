
export const getBooks = async ({ input, id }) => {

  let url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURI(input)}&maxResults=20`

  if (id) url = `https://www.googleapis.com/books/v1/volumes/${id}`

  try {

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
    return await response.json();

  } catch (error) {

    console.error('Error fetching books:', error);
    return null;

  }

};

export const createCard = (id, book, saved) => {

  const card = document.createElement('div')
  card.className = 'card'

  const header = document.createElement('div')
  header.className = 'card__header'

  const favorite = document.createElement('button')
  favorite.className = 'card__favorite'

  const isSaved = JSON.parse(saved).find(savedId => savedId === id)

  const hearts = [
    'images/favorite-open.png',
    'images/favorite-closed.png'
  ]

  const heart = document.createElement('img')
  heart.className = 'card__heart'
  heart.src = isSaved ? hearts[1] : hearts[0]
  heart.alt = 'Heart icon'

  heart.addEventListener('click', () => {
    const savedItems = JSON.parse(localStorage.getItem('saved') || '[]');

    const i = savedItems.indexOf(id);

    if (i >= 0) savedItems.splice(i, 1);
    else savedItems.push(id);

    localStorage.setItem('saved', JSON.stringify(savedItems));

    const isNowSaved = savedItems.includes(id);
    heart.src = isNowSaved ? hearts[1] : hearts[0];
    heart.alt = isNowSaved ? 'Heart icon (saved)' : 'Heart icon (not saved)';
  });

  favorite.appendChild(heart)
  header.appendChild(favorite)

  const body = document.createElement('div')
  body.className = 'card__body'

  const link = document.createElement('a')
  link.className = 'card__title'
  link.href = book.infoLink
  link.innerHTML = book.title.toUpperCase()
  body.appendChild(link)

  const authors = document.createElement('p')
  authors.className = 'card__authors'
  authors.innerText = `${book.authors ? book.authors.join(', ').toUpperCase() : ''}`
  body.appendChild(authors)

  const cover = document.createElement('img')
  cover.className = 'card__cover'
  cover.src = book.imageLinks?.thumbnail ? book.imageLinks.thumbnail : 'images/generic.png'
  cover.alt = 'Thumbnail'
  body.appendChild(cover)

  const tags = document.createElement('div')
  tags.className = 'card__tags'

  const items = [
    book.publisher,
    ...(book.categories || []),
    book.language ? `Language: ${book.language.toUpperCase()}` : false,
    book.publishedDate ? `Published in ${book.publishedDate}` : false,
    book.pageCount ? `${book.pageCount} Pages` : false
  ]

  items.filter(Boolean).forEach(category => {

    const tag = document.createElement('p')
    tag.className = 'card__tag'
    tag.innerText = category.toUpperCase()
    tags.appendChild(tag)

  })

  body.appendChild(tags)

  card.appendChild(header)
  card.appendChild(body)

  return card
}