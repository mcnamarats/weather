//
// brute force mode implementation, that returns the most
// frequent element of an array
//
export const mode = array => {
  if (array.length === 0) return null;
  const modeMap = {};
  let maxEl = array[0];
  let maxCount = 1;

  array.forEach(el => {
    if (modeMap[el] == null) modeMap[el] = 1;
    else modeMap[el] += 1;
    if (modeMap[el] > maxCount) {
      maxEl = el;
      maxCount = modeMap[el];
    }
  });

  return maxEl;
};
//
// format a military time string from a date. For example, 02:00, 13:00
//
export const formatTimeString = date =>
  date.toLocaleTimeString(
    undefined /* don't care about the locale, not for this at least */,
    {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    }
  );
//
// format a date string from a date.  For example 'Fri Dec 25'
//
export const formatDateString = date =>
  date.toLocaleDateString(
    undefined /* don't really care about the locale, not for this at least */,
    {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    }
  );
//
// group a list and create an object literal by key
//
export const groupBy = (f, seq) => {
  const result = {};
  seq.forEach(value => {
    const key = f(value);
    if (!result[key]) result[key] = { data: [] };
    result[key].data.push(value);
  });
  return result;
};

export default {
  mode,
  formatTimeString,
  formatDateString,
  groupBy
};
