/* -----------------    ACTIONS     ------------------ */

const MOVE_FORWARD = 'MOVE_FORWARD';
const MOVE_BACKWARD = 'MOVE_BACKWARD';


/* ------------   ACTION CREATORS     ------------------ */

const moveForward  = index => ({ type: MOVE_FORWARD, index });
const moveBackward = index => ({ type: MOVE_BACKWARD, index });


/* ------------       REDUCER     ------------------ */

export default function reducer (previousState = {index: 0, direction: null}, action) {
  switch (action.type) {

    case MOVE_FORWARD:
      return { index: action.index++, direction: 'forward' };

    case MOVE_BACKWARD:
      return { index: action.index--, direction: 'backward' };

    default:
      return carousel;
  }
}


/* ------------       DISPATCHERS     ------------------ */

export const clickRight = index => dispatch => {
  dispatch(moveForward(index));
};

export const clickLeft = index => dispatch => {
  dispatch(moveBackward(index));
};
