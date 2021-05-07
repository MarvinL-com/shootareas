'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const {sanitizeEntity} = require('strapi-utils')

module.exports = {
  async random(ctx) {
    const lieux = await strapi.services.lieu.find(ctx.query)
    const ids = lieux.map(lieu => lieu.id)
    const getRandomId = (max) => Math.floor(Math.random() * Math.floor(max))

    return lieux.find(lieu => lieu.id === ids[getRandomId(ids.length)])
  },
  async create(ctx) {
    const {lieu} = ctx.request.body;
    const {nom, eclaireur, region, city, localisation, avis} = lieu

    const newLieu = await strapi.services.lieu.create({
      nom,
      eclaireur,
      region: region.id,
      commune: city.id,
      localisation
    })

    const {accessible, passage, nocturne, public: isPublic, note, message, links} = avis

    const newAvis = await strapi.services.avis.create({
      accessible,
      passage,
      accesNocturne: nocturne,
      note,
      public: isPublic,
      isEclaireur: true,
      eclaireur,
      lieu: newLieu.id,
      message,
      links
    })

    return sanitizeEntity(await strapi.services.lieu.findOne({id: newLieu.id}), {model: strapi.models.lieu})
  }
};
