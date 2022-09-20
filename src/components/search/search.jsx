import { useState } from 'react'
import axios from 'axios'
import './search.scss'

function Search() {
  const [submitDisabled, setSubmitDisabled] = useState(true)
  const [marvelCharacters, setMarvelCharacters] = useState([])
  const [error, setError] = useState('')

  const searching = async (searchInput) => {
    if (searchInput.length >= 2) {
      setSubmitDisabled(false)
      await getCharacters(searchInput)
    } else {
      setSubmitDisabled(true)
    }
  }
  const getCharacters = async (searchInput) => {
    axios.get('https://gateway.marvel.com/v1/public/characters', {
      params: { nameStartsWith: searchInput, apikey: '23ad8ef10fd6155e9351a458df23faf5'}
    })
    .then((data) => {
      console.log(data.data.data.results)
      setMarvelCharacters(data.data.data.results)
      console.log(marvelCharacters)
    }).catch((error) => {
      console.log(error)
      setError('Something went wrong.... refresh the page and try again')
    })
  }
  return (
    <>
    <form className="search">
      <input className="search__input" list="marvelCharacters" placeholder="Search terms" onChange={(e) => {searching(e.target?.value)}}/>
      <datalist id="marvelCharacters">
        {marvelCharacters?.map((character, index) => {
          return <option value={character?.name} key={index} />
        })}
      </datalist>
      <input className="search__submit" type="submit" onSubmit={(e) => {getCharacters(e)}} disabled={submitDisabled} value="SEARCH"></input>
    </form>
    <p className="error">{error}</p>
    </>
  )
}

export default Search