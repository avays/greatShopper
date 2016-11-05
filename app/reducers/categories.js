import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const LOAD_CATEGORIES = 'LOAD_CATEGORIES';


/* ------------   ACTION CREATORS     ------------------ */

const loadCategory = categories => ({
  type: LOAD_CATEGORIES,
  categories
});


/* ------------       REDUCER     ------------------ */

export default function reducer (previousState = [], action) {
  switch (action.type) {

    case LOAD_CATEGORIES:
      return action.categories;

    default:
      return previousState;
  }
}


/* ------------       DISPATCHERS     ------------------ */

export const fetchAndStoreCategories = () => {
  return dispatch => {
    axios.get(`/api/categories`)
      .then(categories => dispatch(loadCategory(categories.data)))
      .catch(err => console.error('Fetching categories failed', err))
  }
}