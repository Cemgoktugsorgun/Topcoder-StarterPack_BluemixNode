import Joi from 'joi';
import decorate from 'decorate-it';
import LanguageTranslatorV2 from 'watson-developer-cloud/language-translator/v2';
import ToneAnalyzerV3 from 'watson-developer-cloud/tone-analyzer/v3';

/**
 * Watson cloud service tone analyzer api response
 * @typedef {Object} WatsonToneAnalyzerResponse
 */

/**
 * Watson cloud service translate api response
 * @typedef {Object} WatsonTranslateResponse
 */

/**
 * Translates sourceText from a language to another language
 * @param {String} sourceText - Text to be translated
 * @param {String} sourceLanguageCode - Code of the language the source text belongs to
 * @param {String} destinationLanguageCode - Code of the desired translation language
 * @returns {WatsonTranslateResponse} Response that returned from watson translate api
 */
async function translate(sourceText, sourceLanguageCode, destinationLanguageCode) {
  // Generating a translator with given credentials
  const languageTranslator = new LanguageTranslatorV2({
    url: 'https://gateway.watsonplatform.net/language-translator/api',
    username: '0c46a385-f549-47ed-8b9a-2407c96a7b37',
    password: '0wOSbB54GPoj',
  });

  // Making the api request
  return new Promise((resolve, reject) => languageTranslator.translate({
    text: sourceText,
    source: sourceLanguageCode,
    target: destinationLanguageCode,
  },
  (err, translation) => {
    // If an error occured
    if (err) {
      reject(err);
    } else {
      resolve(translation);
    }
  }));
}

// Translate method params
translate.params = [
  'sourceText',
  'sourceLanguageCode',
  'destinationLanguageCode',
];

// Translate method schema
translate.schema = {
  sourceText: Joi.string().required(),
  sourceLanguageCode: Joi.string().required(),
  destinationLanguageCode: Joi.string().required(),
};

/**
 * Analyze the tone of text by using tone analyzer of watson api
 * @param {String} text - Text to be analyzed
 * @returns {WatsonToneAnalyzerResponse} Response that returned from watson tone analyzer api
 */
async function analyzeTone(text) {
  // Generating an analyzer with given credentials
  const toneAnalyzer = new ToneAnalyzerV3({
    url: 'https://gateway.watsonplatform.net/tone-analyzer/api',
    username: '98cd41fa-df17-4add-92c2-73d13ed3bd7a',
    password: 'HEdboSwkuvsu',
    version_date: '2016-05-19 ',
  });

  return new Promise((resolve, reject) => toneAnalyzer.tone(
    {text},
    (err, tone) => {
      if (err) {
        reject(err);
      } else {
        resolve(tone);
      }
    }
  ));
}

analyzeTone.params = [
  'text',
];

analyzeTone.schema = {
  text: Joi.string().required(),
};


// Wrapper object for service methods
const WatsonService = {
  translate,
  analyzeTone,
};

// Decorating wrapper object for schema validations
decorate(WatsonService, 'WatsonService');

// Exporting methods under wrapper object
export default WatsonService;
