export const validationBodyData = (ctx, field: string) => {
  const data = ctx.request.body.data

  if (data.hasOwnProperty(field)) {
    if (!Number.isInteger(data[field]))
      return true
  }

  return false
}
