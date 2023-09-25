
export default {
  beforeCreate: async (event) => {
    const { data, populate } = event.params

    console.info('beforeCreate', { data, populate })
  },
  // afterCreate: async (event) => {
  //   const { result } = event
  //   checkAvailable(result.id, result.available)
  // },
  // afterUpdate: async (event) => {
  //   const { result } = event
  //   checkAvailable(result.id, result.available)
  // }
}
