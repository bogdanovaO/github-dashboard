
const initialState = {
  count: 0,
  repos: []
};

export default function repositoriesReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_REPOS':
      return {
        ...state,
        repos: action.payload
      };
      case 'COUNT_REPOS':
        return {
          ...state,
          count: action.payload
        };
      default:
        return state;
}
}


