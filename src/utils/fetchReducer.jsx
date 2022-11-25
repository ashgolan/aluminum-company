export const INITIAL_STATE = {
  loading: false,
  data: [],
  error: false,
};

export const dataReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        loading: true,
        data: [],
        error: false,
      };
    case "FETCH_SUCCESS":
      return {
        loading: false,
        data: action.payload,
        error: false,
      };
    case "FETCH_ERROR":
      return {
        loading: false,
        data: [],
        error: true,
      };
  }
};
