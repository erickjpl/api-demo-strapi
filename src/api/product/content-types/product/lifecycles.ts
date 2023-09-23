const { ValidationError } = require('@strapi/utils').errors

function validateCategory (data) {
  if (!data.category.connect) {
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

    const { id: newCategory } = data.category.connect.shift()

    await strapi.service('api::category.category').updateProducts(newCategory)
  },
  beforeUpdate: async (event) => {
    const { data } = event.params

    validateCategory(data)
  },
  afterUpdate: async (event) => {
    const { data } = event.params

    const newCategory = data.category.connect.shift()
    newCategory && await strapi.service('api::category.category').updateProducts(newCategory.id)

    const oldCategory = data.category.disconnect.shift()
    oldCategory && await strapi.service('api::category.category').updateProducts(oldCategory)
  },
  beforeDelete: async (event) => {
    const { data } = event.params

    console.log({ category: data.category, connect: data.category.connect, disconnect: data.category.disconnect })
  },
  afterDelete: async (event) => {
    const { data } = event.params

    console.log({ category: data.category, connect: data.category.connect, disconnect: data.category.disconnect })
  }
}
