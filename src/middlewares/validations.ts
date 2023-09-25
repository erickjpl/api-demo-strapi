/**
 * `validator` middleware
 */

import { Config, METHOD, METHOD_HTTP, TYPE_VALIDATION_RELATION, checkPropertyExistsInBody, validateRelations } from './config';

export default (config: Config[]) => {
  return async (ctx, next) => {
    const pathname = ctx.request.path
    const body = ctx.request.body.data || ctx.request.body
    const method: METHOD_HTTP = ctx.request.method
    const id = ctx.request.path.match(/\/(\d+)$/) ? ctx.request.path.match(/\/(\d+)$/)[1] : null

    config.forEach(setting => {
      const apply = setting.path.some(path => {
        const myPath = path.includes(':id') ? path.replace(':id', id) : path
        return pathname.includes(myPath)
      })

      if (method === setting.method && apply) {
        if (method === METHOD.POST) {
          checkPropertyExistsInBody(body, setting.propertiesRequired)

          validateRelations(body, setting.relationsRequired, TYPE_VALIDATION_RELATION.CREATE)
        }

        if (method === METHOD.PUT) {
          console.info({ body })
          validateRelations(body, setting.relationsRequired, TYPE_VALIDATION_RELATION.UPDATE)
        }
      }
    })

    await next()
  }
}
