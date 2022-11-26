export const INITIAL_STATE = {
  inventory: [],
  bid: [{ name: "", date: "", isAproved: false, items: [] }],
  forging: [],
};

const FETCH_ALL_DATA = (state, data) => {
  return { ...state, inventory: data };
};
const ADD = (state, Obj) => {
  return { ...state, inventory: [...state.inventory, Obj] };
};
const EDIT = (state, updatedData) => {
  return { ...state, inventory: updatedData };
};
const DELETE = (state, updatedData) => {
  return { ...state, inventory: updatedData };
};

// const FetchAllData = (category, state, data) => {
//   return { ...state, [category]: data };
// };

export const fetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_ALL_DATA":
      return FETCH_ALL_DATA(state, action.payload);
    case "ADD":
      return ADD(state, action.payload);
    case "EDIT":
      return EDIT(state, action.payload);
    case "DELETE":
      return DELETE(state, action.payload);
  }
};
