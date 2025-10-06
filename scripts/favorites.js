import { getBooks, createCard } from './book.js'

if (!localStorage.getItem('saved')) {
  localStorage.setItem('saved', JSON.stringify([]));
}

const results = document.getElementById('results')

const main = async () => {

  const saved = JSON.parse(localStorage.getItem('saved'));

  if (saved.length === 0) return

  const books = await Promise.all(await saved.map(id => getBooks({ id })))

  console.log(books)

  const cards = books.map(({ id, volumeInfo }) => createCard(id, volumeInfo, localStorage.getItem('saved')))

  results.innerHTML = ''

  cards.forEach(card => results.appendChild(card))
}

main()

