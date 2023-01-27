import queryString from 'query-string';

import { useLocation, useNavigate } from 'react-router';
import { useForm } from '../../hooks';
import { HeroCard } from '../components/HeroCard';
import { getHeroesByName } from '../helpers/getHeroByName';

export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
          <form onSubmit={onSearchSubmit}>
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

          {!query && <div className='alert alert-primary'>Search a hero</div>}

          {query && heroes.length === 0 && (
            <div className='alert alert-danger'>
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
