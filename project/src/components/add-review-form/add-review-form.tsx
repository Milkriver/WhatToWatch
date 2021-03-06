import React, { FormEvent, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { AppRoute } from '../../const';
import { addReviewAction } from '../../store/api-actions';
import { getAddedReview } from '../../store/reviews-data/selectors';
import { ThunkAppDispatch } from '../../types/actions';
import { IReviewRequest } from '../../types/reviews';
import { IState } from '../../types/state';


interface IProps {
  currentPageId: string,
}

const mapStateToProps = (state: IState) => ({
  review: getAddedReview(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onSubmitAddReviewButton({ rating, comment }: IReviewRequest, id: string) {
    return dispatch(addReviewAction({ rating, comment }, id));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & IProps;

function AddReviewForm({ onSubmitAddReviewButton, currentPageId }: ConnectedComponentProps): JSX.Element {
  const id = currentPageId.replace('/review', '');
  const [rating, setRating] = useState('8');
  const [reviewText, setReviewText] = useState('');
  const ratingStars = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  function handleRatingChange(event: React.ChangeEvent<HTMLInputElement>) {
    setRating(event.currentTarget.value);
  }

  function handleReviewFormChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setReviewText(event.currentTarget.value);
  }

  const history = useHistory();
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (rating !== null && reviewText !== null) {
      if (reviewText.length >= 50) {
        onSubmitAddReviewButton({
          rating: Number(rating),
          comment: reviewText,
        }, id)
          .then(() => toast.success('Отзыв отправлен'))
          .then(() => history.push(AppRoute.Film.replace(':id', id)));
      } else {
        if (reviewText.length < 50 || reviewText.length === 400) {
          toast.error('Необходимая длина сообщения от 50 до 400 символов');
        }
      }
    }
  };
  return (
    <form action="#" className="add-review__form" onSubmit={handleSubmit}>
      <div className="rating">
        <div className="rating__stars">
          {ratingStars.map((star) => (
            <React.Fragment key={star}>
              <input
                className="rating__input"
                id={`star-${star}`}
                type="radio"
                name="rating"
                value={star}
                required
                checked={star === Number(rating)}
                onChange={handleRatingChange}
              />
              <label
                className="rating__label"
                htmlFor={`star-${star}`}
              > Rating {star}
              </label>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="review-text" id="review-text"
          placeholder="Review text"
          value={reviewText}
          maxLength={400}
          required
          onChange={handleReviewFormChange}
        >
        </textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post
          </button>
        </div>

      </div >
    </form >
  );
}

export { AddReviewForm };
export default connector(AddReviewForm);


