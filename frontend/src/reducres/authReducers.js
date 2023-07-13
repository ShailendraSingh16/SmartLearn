import { actionTypes } from '../utils/constants';

export const authReducers = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: '',
      };
    case actionTypes.LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        loading: false,
        error: '',
      };
    case actionTypes.START_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case actionTypes.STOP_LOADING:
      return {
        ...state,
        loading: false,
        error: '',
      };
    case actionTypes.SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: '',
      };
    default:
      return state;
  }
};

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START,
  };
};

export const loginSuccess = (user) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: user,
  };
};

export const loginFailed = (error) => {
  return {
    type: actionTypes.LOGIN_FAILED,
    payload: error,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const startLoading = () => {
  return {
    type: actionTypes.START_LOADING,
  };
};

export const stopLoading = () => {
  return {
    type: actionTypes.STOP_LOADING,
  };
};

export const setError = (error) => {
  return {
    type: actionTypes.SET_ERROR,
    payload: error,
  };
};

export const clearError = () => {
  return {
    type: actionTypes.CLEAR_ERROR,
  };
};
