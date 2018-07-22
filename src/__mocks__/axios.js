import data from '../mock-data/weather.json';

export default {
  get: jest.fn(
    () => new Promise(resolve => process.nextTick(resolve({ data })))
  )
};
