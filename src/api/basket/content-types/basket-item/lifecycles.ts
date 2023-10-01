let basketIds

export default {
  beforeDelete: async (event) => {
    const { where } = event.params
    basketIds = await findBasket(where.id)
  },
  afterDelete: async () => {
    strapi.service('api::basket.basket-item').syncTotalBasket(basketIds)
  },
  beforeDeleteMany: async (event) => {
    const { where } = event.params
    const ids = where['$and'][0]['id']['$in']
    basketIds = await findBasket(ids)
  },
  afterDeleteMany: async () => {
    basketIds.forEach((basketId) => strapi.service('api::basket.basket-item').syncTotalBasket(basketId))
  }
}

const findBasket = async (ids: number | number[]) => {
  const items = await strapi
    .db
    .query('api::basket.basket-item')
    .findMany({ where: { id: ids }, populate: ['basket'] })

  return items && typeof ids === 'object'
    // ? items.filter((item, index, self) => self.indexOf(item.basket.id) === index)
    ? [...new Set(items.map((item) => item.basket.id))]
    : items[0].basket.id
}
