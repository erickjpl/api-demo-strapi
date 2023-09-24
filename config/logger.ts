
'use strict'

import winston, { format } from 'winston'
const { prettyPrint } = format

export default [
  {
    transports: [
      new winston.transports.Console({
        level: 'http',
        format: winston.format.combine(
          prettyPrint({ colorize: true })
        ),
      }),
    ],
  },
]
