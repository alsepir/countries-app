import { put, all } from 'redux-saga/effects';
import { api } from '../../api';
import { ICountryModel } from '../types';
import { requestRegionSuccessAction, requestRegionErrorAction } from '../reducers/countries'

export function* requestRegionSaga() {
  const countries = ['asia', 'europe', 'africa', 'americas', 'oceania'];
  const promises = countries.map(item => api.regionRequest(item));

  try {
    const res: ICountryModel[][] = yield all(promises);

    const newState = res.reduce((acc, item, index) => {
      const sorted = item.sort((a, b) => b.population - a.population);
      const top10 = sorted.slice(0, 10);
      return { ...acc, [countries[index]]: top10 };
    }, {});

    yield put(requestRegionSuccessAction(newState))
  } catch (e) {
    yield put(requestRegionErrorAction())
  }
}



