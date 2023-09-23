const { ValidationError } = require('@strapi/utils').errors

function validateCategory (data) {
  if (data.category.connect.length === 0) {
    throw new ValidationError('You cannot send an empty category. Please validate the field.')
  }
}

export default {
  beforeCreate: async (event) => {
    const { data } = event.params

    validateCategory(data)
  },
  afterCreate: async (event) => {
    const { data } = event.params

    const newCategory = data.category.connect.shift()

    await strapi.service('api::category.category').updateProducts(newCategory.id)
  },
  afterUpdate: async (event) => {
    const { data } = event.params

    const newCategory = data.category?.connect?.shift()
    newCategory && await strapi.service('api::category.category').updateProducts(newCategory.id)

    const oldCategory = data.category?.disconnect?.shift()
    oldCategory && await strapi.service('api::category.category').updateProducts(oldCategory.id)
  },
  afterDelete: async (event) => {
    console.log({ afterDelete: event.params, result: event.result })
  }
}
