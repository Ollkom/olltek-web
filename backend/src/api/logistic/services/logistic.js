'use strict';

/**
 * logistic service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::logistic.logistic');
