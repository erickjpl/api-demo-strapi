/**
 * `validator` middleware
 */

import { Config, METHOD_HTTP, Modules, NOT_VALIDATE } from "./interfaces"
import { validBody } from "./config"


export default (config: Config<Modules>[]) => {
  return async (ctx, next) => {
    const pathname = ctx.request.path
    const body = ctx.request.body.data || ctx.request.body
    const method: METHOD_HTTP = ctx.request.method
    const id = ctx.request.path.match(/\/(\d+)$/) ? ctx.request.path.match(/\/(\d+)$/)[1] : null

    config.forEach(setting => {
      const apply = setting.path.some(path => {
        const noValidate = NOT_VALIDATE.find(path => pathname.includes(path))
        if (noValidate) return false

        const myPath = path.includes(':id') ? path.replace(':id', id) : path
        return pathname.includes(myPath)
      })

      if (method === setting.method && apply) {
        validBody(body, setting.validations)
      }
    })

    await next()
  }
}
