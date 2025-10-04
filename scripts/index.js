import { getBooks, createCard } from './book.js'
import { getQuote } from './quote.js'

const text = document.getElementById('text')
const author = document.getElementById('author')
const form = document.getElementById('search')
const results = document.getElementById('results')

form.addEventListener('submit', async (event) => {

  event.preventDefault()

  const data = new FormData(form)
  const input = data.get('search') || ''

  const books = await getBooks(input)

  const cards = books.items.map(({ volumeInfo }) => createCard(volumeInfo))

  results.innerHTML = ''

  cards.forEach(card => results.appendChild(card))
})

const main = async () => {

  const quote = await getQuote()

  text.textContent = `"${quote.quote}"`
  author.textContent = `- ${quote.author}`

  const books = await getBooks({ title: 'rowling' })
}

main()