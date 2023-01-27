import { useMemo } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';

import { HeroCard } from '../components';
import { getHeroesById } from '../helpers';

export const HeroPage = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const hero = useMemo(() => getHeroesById(id), [id]);

  if (!hero) return <Navigate to={'/marvel'} />;

  const heroImageUrl = `/assets/heroes/${id}.jpg`;

  const onNavigateBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className='row mt-5'>
        <div className='col-4'>
          <img
            src={heroImageUrl}
            alt={hero.superhero}
            className='img-thumbnail animate__animated animate__fadeInLeft'
          />
        </div>
        <div className='col-8'>
          <h3>{hero.superhero}</h3>
          <ul className='list-group list-group-flush'>
            <li className='list-group-item'>
              <b>Alter ego: </b>
              {hero.alter_ego}
            </li>
            <li className='list-group-item'>
              <b>Publisher: </b>
              {hero.publisher}
            </li>
            <li className='list-group-item'>
              <b>First appearance: </b>
              {hero.first_appearance}
            </li>
          </ul>
          <h5 className='mt-3'>Characters</h5>
          <p>{hero.characters}</p>

          <button onClick={onNavigateBack} className='btn btn-outline-primary'>
            Regresar
          </button>
        </div>
      </div>
    </>
  );
};
