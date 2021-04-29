'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async random(ctx) {
    const lieux = await strapi.services.lieu.find(ctx.query)
    const ids = lieux.map(lieu => lieu.id)
    const getRandomId = (max) => Math.floor(Math.random() * Math.floor(max))

    return lieux.find(lieu => lieu.id === ids[getRandomId(ids.length)])
  }
};
