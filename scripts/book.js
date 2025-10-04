
export const getBooks = async (input) => {

  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURI(input)}&maxResults=20`

  try {

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
    return await response.json();

  } catch (error) {

    console.error('Error fetching books:', error);
    return null;

  }

};

export const createCard = (book) => {

  console.log(book)

  const card = document.createElement('div')
  card.className = 'card'

  const link = document.createElement('a')
  link.className = 'card__title'
  link.href = book.infoLink
  link.innerHTML = book.title.toUpperCase()
  card.appendChild(link)

  const authors = document.createElement('p')
  authors.className = 'card__authors'
  authors.innerText = `${book.authors ? book.authors.join(', ').toUpperCase() : ''}`
  card.appendChild(authors)

  const cover = document.createElement('img')
  cover.className = 'card__cover'
  cover.src = book.imageLinks?.thumbnail ? book.imageLinks.thumbnail : '../images/generic.png'
  cover.alt = 'Thumbnail'
  card.appendChild(cover)

  const tags = document.createElement('div')
  tags.className = 'card__tags'

  const items = [
    `${book.publisher}`,
    ...(book.categories || []),
    `Language: ${book.language.toUpperCase()}`,
    `Published in ${book.publishedDate}`,
    `${book.pageCount} Pages`
  ]

  items.forEach(category => {

    const tag = document.createElement('p')
    tag.className = 'card__tag'
    tag.innerText = category.toUpperCase()
    tags.appendChild(tag)

  })


  card.appendChild(tags)

  return card
}