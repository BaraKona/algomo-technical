import { useState } from 'react'
import axios from 'axios'
import './search.scss'

function Search() {
  const [submitDisabled, setSubmitDisabled] = useState(true)
  const [marvelCharacters, setMarvelCharacters] = useState([])
  const [showList, setShowList] = useState('')
  const [error, setError] = useState('')

  const searching = async (searchInput) => {
    if (searchInput.length >= 2) {
      setSubmitDisabled(false)
      await getCharacters(searchInput)
    } else {
      setSubmitDisabled(true)
      setMarvelCharacters([])
      setShowList('')
    }
  }
  const getCharacters = async (searchInput) => {
    axios.get('https://gateway.marvel.com/v1/public/characters', {
      params: { nameStartsWith: searchInput, apikey: process.env.REACT_APP_PUBLIC_MARVEL_KEY}
    })
    .then((data) => {
      setMarvelCharacters(data.data.data.results)
      setShowList('active')
    }).catch((error) => {
      setError('Something went wrong.... refresh the page and try again')
    })
  }
  return (
    <>
    <form className="search">
      <label className="label"> Search </label>
      <input className="search__input" placeholder="Search terms" onChange={(e) => {searching(e.target?.value)}}/>
      <div id="marvelCharacters" className={`datalist ${showList}`}>
        {marvelCharacters?.map((character, index) => {
          return <p className="option" key={index}>{character?.name}</p>
        })}
      </div>
      <input className="search__submit" type="submit" onSubmit={(e) => {getCharacters(e)}} disabled={submitDisabled} value="SEARCH"/>
    </form>
    <p className="error">{error}</p>
    </>
  )
}

export default Search