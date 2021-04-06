import axios from "axios";
import {
    CLEAR_USERS_SEARCH_QUERY, CLOSE_USERS_FILTER,
    CLOSE_USERS_FORM, CLOSE_USERS_VIEW,
    GET_USERS, SET_UPDATED_USER, SET_USER_FORM_LOADING,
    SET_USERS_LOADING,
    SET_USERS_SEARCH_QUERY, SHOW_USERS_FILTER,
    SHOW_USERS_FORM, SHOW_USERS_VIEW
} from "./userTypes";


const url = process.env.MIX_SERVER_API_URL;

// Get users
export const getUsers = () => (dispatch, getState) => {
    dispatch(setUsersLoading());
    const {searchQuery} = getState().users
    axios
        .get(`${url}/user${searchQuery}`)
        .then(res =>
            dispatch({
                type: GET_USERS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_USERS,
                payload: {}
            })
        )
}

// Get user by ip.
export const getUserById = (id,query = '') => {
    return new Promise(async (resolve, reject) => {
        axios
            .get(`${url}/user/${id}${query}`)
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    })
}

// Create new user
export const createUser = data => (dispatch,getState) => {
    const {searchQuery} = getState().users;
    return new Promise(async (resolve, reject) => {
        axios
            .post(`${url}/user`,data)
            .then(res => {
                searchQuery === '' ? dispatch(getUsers()) : dispatch(clearUserSearchQuery())
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}

// Update user
export const updateUser = (id,data) => {
    return new Promise(async (resolve,reject) => {
        axios.patch(`${url}/user/${id}`,data)
            .then(res => resolve(res.data))
            .catch(err => reject(err))
    })
}

// Delete user
export const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        axios
            .delete(`${url}/user/${id}`)
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    })
}

// Merge updated user.
export const setUpdateUser = (payload) => {
    return {
        type: SET_UPDATED_USER,
        payload
    }
}

// Set users loading
export const setUsersLoading = () => {
    return {
        type: SET_USERS_LOADING
    }
}

// Clear users SearchQuery
export const clearUserSearchQuery = () => {
    return {
        type: CLEAR_USERS_SEARCH_QUERY
    }
}

// Show user Form
export const showUserForm = (data = {}) => {
    return {
        type: SHOW_USERS_FORM,
        payload: data
    }
}

// Close user Form
export const closeUserForm = () => {
    return {
        type: CLOSE_USERS_FORM
    }
}

// Show user view modal
export const showUserView = (payload) => {
    return {
        type: SHOW_USERS_VIEW,
        payload
    }
}

// Close user view modal
export const closeUserView = () => {
    return {
        type: CLOSE_USERS_VIEW
    }
}

// Show user filter modal
export const showUserFilter = () => {
    return {
        type: SHOW_USERS_FILTER,
    }
}

// Close user filter modal
export const closeUserFilter = () => {
    return {
        type: CLOSE_USERS_FILTER
    }
}

// Set Search query
export const setUserSearchQuery = (payload = {}) => {
    return {
        type: SET_USERS_SEARCH_QUERY,
        payload
    }
}

// Set User Form loading
export const setUserFormLoading = () => {
    return {
        type: SET_USER_FORM_LOADING,
    }
}

// Get all users without pagination
export const getAllUsers = async () => {
    return new Promise(async (resolve, reject) => {
        axios
            .get(`${url}/user-all`)
            .then(res => resolve(res.data))
            .catch(err => reject(err.response.data))
    })
}