export const INITIAL_STATE = {
  inventory: [],
  bids: [],
  forging: [],
  calc: [],
};

const FETCH_ALL_DATA = (state, configData) => {
  return { ...state, [configData.type]: configData.setupData };
};
const ADD = (state, configObj) => {
  return {
    ...state,
    [configObj.type]: [...state[configObj.type], configObj.data],
  };
};
const EDIT = (state, configObj) => {
  return { ...state, [configObj.type]: configObj.updateData };
};
const DELETE = (state, updatedData) => {
  return { ...state, inventory: updatedData };
};

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
