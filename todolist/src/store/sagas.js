import { put, takeLatest } from 'redux-saga/effects';
import { GET_INIT_LIST } from './actionTypes';
import { getInitListAction } from './actionCreators';
import axios from 'axios';

//也可以接收的action
function* mySaga() {
    yield takeLatest(GET_INIT_LIST, getInitList);
}

function* getInitList() {
    try {
        const res = yield axios.get('https://www.easy-mock.com/mock/5ca1b065e81534559ae87ead/test/getTodoList');
        const action = getInitListAction(res);
        yield put(action);
    } catch(e) {
        console.log('failed')
    }
}

export default mySaga;