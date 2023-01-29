import queryString from 'query-string';

import { useLocation, useNavigate } from 'react-router';
import { useForm } from '../../hooks';
import { HeroCard } from '../components/HeroCard';
import { getHeroesByName } from '../helpers/getHeroByName';

export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const { q: query = '' } = queryString.parse(location.search);

  const { searchText, onInputChange } = useForm({ searchText: query });

  const heroes = getHeroesByName(query);

  const onSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`?q=${searchText}`);
  };

  const hero = null;
  return (
    <>
      <h1>SearchPage</h1>
      <hr />
      <div className='row'>
        <div className='col-5'>
          <h4>Searching</h4>
          <hr />
          <form onSubmit={onSearchSubmit} aria-label='form'>
            <input
              type='text'
              placeholder='Search a hero'
              className='form-control'
              name='searchText'
              autoComplete='off'
              value={searchText}
              onChange={onInputChange}
            />
            <button className='btn btn-outline-primary mt-3'>Search</button>
          </form>
        </div>

        <div className='col-7'>
          <h4>Results</h4>
          <hr />

          {!query && (
            <div aria-label='alert-default' className='alert alert-primary'>
              Search a hero
            </div>
          )}

          {query && heroes.length === 0 && (
            <div aria-label='alert-danger' className='alert alert-danger'>
              No hero with <b>{query}</b>
            </div>
          )}

          {heroes.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </>
  );
};
