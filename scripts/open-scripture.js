
const baseUrl = 'https://openscriptureapi.org/api/scriptures/v1/lds/en/';

export const parseInputReference = async (input) => {

  const endpoint = 'referencesParser';

  try {
    
    const response = await fetch(`${baseUrl}${endpoint}?reference=${encodeURIComponent(input)}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();

  } catch (error) {

    console.error(`Unable to parse reference from input. ${error}`);
    
    return null;

  }
};