export const ACTIONS = {
  ADD_TASK: "ADD_TASK",
  EDIT_TASK: "EDIT_TASK",
  DELETE_TASK: "DELETE_TASK",
  MOVE_TASK: "MOVE_TASK",
};

export const taskReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      return [...state, action.payload];
    case ACTIONS.EDIT_TASK:
      return state.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, ...action.payload };
        }
        return task;
      });
    case ACTIONS.DELETE_TASK:
      return state.filter((task) => task.id !== action.payload.id);
    case ACTIONS.MOVE_TASK:
      return state.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, status: action.payload.status };
        }
        return task;
      });
    default:
      return state;
  }
};
