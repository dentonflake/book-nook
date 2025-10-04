
const url = 'https://dummyjson.com/quotes/random'

export const getQuote = async () => {

  try {

    const response = await fetch(url);

    if (!response.ok) throw new Error(`HTTP error! ${response.status}`);

    return await response.json();

  } catch (error) {

    console.error('Error fetching quote:', error);

    return null;

  }
}