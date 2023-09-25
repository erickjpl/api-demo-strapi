
'use strict'

import { winston, formats } from '@strapi/logger'
const { prettyPrint, levelFilter } = formats

export default [
  {
    transports: [
      new winston.transports.Console({
        level: 'dev',
        format: winston.format.combine(
          levelFilter('dev'),
          prettyPrint({ timestamps: 'YYYY-MM-DD hh:mm:ss.SSS' })
        ),
      }),
    ],
  },
]
