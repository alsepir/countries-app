import { takeLatest, all } from 'redux-saga/effects'
import { REQUEST_REGION } from '../reducers/countries'
import { requestRegionSaga } from './countries'

function* watchIncrementAsync() {
  yield takeLatest(REQUEST_REGION, requestRegionSaga)
}

export default function* init() {
  yield all([watchIncrementAsync()])
}