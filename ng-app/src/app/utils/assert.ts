export const assert = function(condition, message) {
  if (!condition)
    throw Error('Assert failed: ' + (message || ''));
};
