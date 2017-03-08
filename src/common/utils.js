/**
 * Validate request by comparing its query or body and parameters
 * @param {Object} query - Query or body object which consists of {parameter key} => {value} pairs
 * @param {Array} parameters - Array of expected parameters from request
 *
 * @returns
 */
export const validateRequest = (query, ...parameters) => {

  // If expected parameters array is empty then there is nothing to check
  if (parameters.length === 0) {
    return true;
  }

  // Getting keys of query object
  const queryKeys = Object.keys(query);

  // Check whether the query variable contains an object and not empty
  if (queryKeys.length === 0 && query.constructor === Object) {
    return false;
  }

  // Founding how many expected parameters is included by query
  const numberOfValidatedParameters = parameters
  .map(param => queryKeys.includes(param))  // Checking if query includes expected parameter
  .reduce((prev, curr) => curr ? prev + 1 : prev, 0);  // To found out the number of expected parameters in query

  // Returning comparison of number of parameters and the number of parameters included by query 
  return numberOfValidatedParameters === parameters.length;
};
