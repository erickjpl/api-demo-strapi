export function useBasket (strapi) {


  const searchCustomerBasket = async (user) => {
    return await strapi.db.query('api::basket.basket').findOne({
      select: ['id'],
      where: {
        user: user.connect[0].id,
        basketStatus: 'Active'
      }
    })
  }

  const basketObjectToStore = (user, sanitizedQuery, sanitizedInputData) => {
    return {
      ...sanitizedQuery,
      data: {
        user: user.connect[0].id,
        ...sanitizedInputData
      }
    }
  }

  const saveData = async (basket, payload) => {
    let entity

    if (basket) {
      entity = await strapi
        .service('api::basket.basket')
        .update(basket.id, payload)
    } else {
      entity = await strapi
        .service('api::basket.basket')
        .create(payload)
    }

    return entity
  }

  const delegateItemRegistration = async (entity, sanitizedInputData) => {
    let payload = {
      basket: entity.id,
      inventory: sanitizedInputData.inventory.connect[0].id,
      quantity: sanitizedInputData.quantity,
      price: sanitizedInputData.price
    }

    if (sanitizedInputData.discount !== undefined) payload = { ...sanitizedInputData, discount: sanitizedInputData.discount }
    if (sanitizedInputData.itemStatus !== undefined) payload = { ...sanitizedInputData, itemStatus: sanitizedInputData.itemStatus }

    await strapi
      .service('api::basket.basket-item')
      .syncItem(payload)
  }

  return {
    searchCustomerBasket,
    basketObjectToStore,
    saveData,
    delegateItemRegistration
  }
}
