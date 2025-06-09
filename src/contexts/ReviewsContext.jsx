import { createContext, useContext, useState, useEffect } from 'react';

const ReviewsContext = createContext();

export function ReviewsProvider({ children }) {
  const [reviews, setReviews] = useState(() => {
    try {
      const savedReviews = localStorage.getItem('productReviews');
      if (savedReviews) {
        const parsedReviews = JSON.parse(savedReviews);
        if (
          typeof parsedReviews === 'object' &&
          Object.values(parsedReviews).every(
            (reviewArray) =>
              Array.isArray(reviewArray) &&
              reviewArray.every(
                (review) =>
                  typeof review.id === 'string' &&
                  typeof review.rating === 'number' &&
                  review.rating >= 1 &&
                  review.rating <= 5 &&
                  (review.comment == null || typeof review.comment === 'string') &&
                  typeof review.timestamp === 'number'
              )
          )
        ) {
          console.log('Loaded reviews from localStorage:', parsedReviews);
          return parsedReviews;
        }
        console.warn('Invalid reviews data in localStorage, resetting to empty');
        localStorage.removeItem('productReviews');
      }
      return {};
    } catch (error) {
      console.error('Error parsing reviews from localStorage:', error);
      localStorage.removeItem('productReviews');
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('productReviews', JSON.stringify(reviews));
      console.log('Saved reviews to localStorage:', reviews);
    } catch (error) {
      console.error('Error saving reviews to localStorage:', error);
    }
  }, [reviews]);

  const addReview = (productId, rating, comment = '') => {
    if (typeof productId !== 'number') {
      console.error('Invalid productId:', productId);
      return false;
    }
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      console.error('Invalid rating:', rating);
      return false;
    }
    if (typeof comment !== 'string') {
      console.error('Invalid comment:', comment);
      return false;
    }

    const reviewId = crypto.randomUUID();
    const timestamp = Date.now();
    const newReview = { id: reviewId, rating, comment: comment.trim(), timestamp };

    setReviews((prevReviews) => ({
      ...prevReviews,
      [productId]: [...(prevReviews[productId] || []), newReview],
    }));
    return true;
  };

  const getReviewsForProduct = (productId) => {
    return reviews[productId] || [];
  };

  const getAverageRating = (productId) => {
    const productReviews = reviews[productId] || [];
    if (productReviews.length === 0) return 0;
    const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
    return Number((sum / productReviews.length).toFixed(1));
  };

  const getReviewCount = (productId) => {
    return (reviews[productId] || []).length;
  };

  return (
    <ReviewsContext.Provider
      value={{
        addReview,
        getReviewsForProduct,
        getAverageRating,
        getReviewCount,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
}