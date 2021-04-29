'use strict';
const slugify = require('slugify')
const axios = require('axios')

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      if (data.nom) {
        data.slug = slugify(data.nom, {lower: true})
      }
    },
    async beforeUpdate(params, data) {
      data.slug = slugify(data.nom, {lower: true})
    },
    async afterCreate(result, data) {
      // fetch and create region's communes
      const {data: cities} = await axios.get(`https://geo.api.gouv.fr/departements/${result.code}/communes`)
      for (const c of cities) {
        await strapi.services.commune.create({
          nom: c.nom,
          zipcode: c.codesPostaux[0],
          region: result
        })

      }
    }
  }
};
