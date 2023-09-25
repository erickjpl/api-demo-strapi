/**
 * `validator` middleware
 */

import { Config, METHOD, METHOD_HTTP, TYPE_VALIDATION_RELATION, checkPropertyExistsInBody, validateRelations } from './config'

export default (config: Config) => {
  console.info({ config })

  return async (ctx, next) => {
    const pathname = ctx.request.path
    const method: METHOD_HTTP = ctx.request.method
    if (!config.methods.includes(method)) return await next()

    if (pathname.includes(config.uid) || pathname.includes(config.module)) {
      const body = ctx.request.body.data
      if (method === METHOD.POST) {
        checkPropertyExistsInBody(body, config.propertiesRequired)

        validateRelations(body, config.relationsRequired, TYPE_VALIDATION_RELATION.CREATE)
      }

      if (method === METHOD.PUT) {
        validateRelations(body, config.relationsRequired, TYPE_VALIDATION_RELATION.UPDATE)
      }
    }

    await next()
  }
}
