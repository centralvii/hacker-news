const BASE_URL = 'https://hacker-news.firebaseio.com/v0'

export const fetchStories = async (
  type: 'topstories' | 'newstories' | 'beststories'
) => {
  const response = await fetch(`${BASE_URL}/${type}.json`)
  return response.json()
}

export const fetchItem = async (id: number) => {
  const response = await fetch(`${BASE_URL}/item/${id}.json`)
  return response.json()
}
