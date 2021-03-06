import { MovieCardElement } from './../movie-card-element/movie-card-element';
import { IMovie } from '../../types/common';
import { useEffect, useState } from 'react';
import { HeaderLogo } from '../header-logo/header-logo';
import HeaderUserBlock from '../header-user-block/header-user-block';
import { Footer } from '../footer/footer';
import { IState } from '../../types/state';
import { ThunkAppDispatch } from '../../types/actions';
import { fetchFavoriteMovies } from '../../store/api-actions';
import { connect, ConnectedProps } from 'react-redux';
import { getFavouriteMovies } from '../../store/movies-data/selectors';


const mapStateToProps = (state: IState) => ({
  favouriteMovies: getFavouriteMovies(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onFetchFavouriteMovies() {
    dispatch(fetchFavoriteMovies());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function MyList({ favouriteMovies, onFetchFavouriteMovies }: PropsFromRedux): JSX.Element {
  const [activeCardId, setActiveMovieCardId] = useState<number | undefined>();

  useEffect(() => {
    onFetchFavouriteMovies();
  }, [onFetchFavouriteMovies]);


  const renderMyMovie = (favouriteSingleCard: IMovie): React.ReactNode => (
    <MovieCardElement
      key={favouriteSingleCard.id}
      activeCardId={activeCardId}
      filmName={favouriteSingleCard.name}
      videoLink={favouriteSingleCard.videoLink}
      posterSrc={favouriteSingleCard.posterImage}
      id={favouriteSingleCard.id}
      onMouseOver={setActiveMovieCardId}
    />);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <HeaderLogo />
        <h1 className="page-title user-page__title">My list</h1>
        <HeaderUserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">

          {favouriteMovies.map(renderMyMovie)}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export { MyList };
export default connector(MyList);
