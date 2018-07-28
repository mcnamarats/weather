import store from '../store';
import { initialState } from '../module';

describe('Redux store', () => {
  test('store is configured with initial state', () => {
    expect(store.getState()).toEqual(initialState);
  });
});
