import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, GET_INIT_LIST } from './actionTypes';
// import axios from 'axios';

export const getInputChangeAction = (value) => ({
    type: CHANGE_INPUT_VALUE,
    value
});
export const getAddItemAction = () => ({
    type: ADD_TODO_ITEM
});
export const getDeleteItemAction = (index) => ({
    type: DELETE_TODO_ITEM,
    index
});
export const getInitListAction = (data) => ({
    type: GET_INIT_LIST,
    data: data
});

// redux-chunk
// export const deleteItemAction = (index) => (dispatch, getState) => {
//     axios.get('https://www.easy-mock.com/mock/5ca1b065e81534559ae87ead/test/getTodoList').then(res => {
//         dispatch(getDeleteItemAction(index))
//     })
// }
