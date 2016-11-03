/* -----------------    ACTIONS     ------------------ */

const INITIALIZE = 'INITIALIZE_USERS'


/* ------------   ACTION CREATORS     ------------------ */

const init  = users => ({ type: INITIALIZE, users })


/* ------------       REDUCER     ------------------ */

export default function reducer (users = [], action) {
  switch (action.type) {

    case INITIALIZE:
      return action.users

    default:
      return users;
  }
}


/* ------------       DISPATCHERS     ------------------ */

// export const fetchUsers = () => dispatch => {
//   axios.get('/api/users')
//        .then(res => dispatch(init(res.data)));
// }
