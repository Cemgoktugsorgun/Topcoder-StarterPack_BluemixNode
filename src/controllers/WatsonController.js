import WatsonService from '../services/WatsonService';
import { validateRequest } from '../common/utils';
import DB from '../common/db';


/**
 * Express framework request object
 * @typedef {Object} ExpressRequest
 */

/**
 * Express framework response object
 * @typedef {Object} ExpressResponse
 */

/**
 * Handle request made to translate api point
 * @param {ExpressRequest} req - Request object
 * @param {ExpressResponse} res - Response object
 *
 * @returns {ExpressResponse} Express response object
 */
async function translate(req, res) {
  if (!validateRequest(req.query, 'sourceText', 'sourceLanguageCode', 'destinationLanguageCode')) {
    return res.send({
      code: 400,
      message: 'The input is not valid',
    });
  }

  // Extracting required variables from query
  const {
    sourceText,
    sourceLanguageCode,
    destinationLanguageCode,
  } = req.query;

  try {
    // Making an api call for translation
    const translatePromise = WatsonService.translate(
      sourceText,
      sourceLanguageCode,
      destinationLanguageCode,
    );

    // Making an api call for tone analyze from source language
    const analyzeSourcePromise = WatsonService.analyzeTone(sourceText);

    // Waiting for translate to finish
    const translateResult = await translatePromise;

    // Translated text
    const translatedText = translateResult.translations[0].translation;

    // Making an api call for tone analyze from translated language
    const analyzeTranslatedResult = await WatsonService.analyzeTone(translatedText);

    // Waiting for source text tone analyze
    const analyzeSourceResult = await analyzeSourcePromise;

    // Setting response object
    const responseObj = {
      sourceText,
      sourceLanguageCode,
      destinationLanguageCode,
      translatedText,
      sourceTextTone: JSON.stringify(analyzeSourceResult),
      translatedTextTone: JSON.stringify(analyzeTranslatedResult),
    };

    // Returning the response
    res.send(responseObj);

    DB.insert(responseObj, (err, body, header) => {
      console.log(err, body, header);
    });

  } catch (e) {
    // Logging the error
    console.log(e);

    // Returning 500 error message
    return res.send({
      code: 500,
      message: 'Unexpected error',
    });
  }
}

/**
 * Handle request made to translate api point
 * @param {ExpressRequest} req - Request object
 * @param {ExpressResponse} res - Response object
 */
async function history(req, res) {
  res.send({code: 'success', message: 'test'});
}

export default {
  translate,
  history,
};