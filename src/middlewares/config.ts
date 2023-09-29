import { errors } from '@strapi/utils'
import { Modules, Validation, ValidationError } from './interfaces'
import { RequiredValidator, SometimesValidator } from './validations/Validator'
const { ValidationError } = errors

function requestFail<T extends Modules> (errors: ValidationError<T>[]) {
  const message = errors.length === 1 ? errors[0].message : `${errors.length} errors occurred.`
  throw new ValidationError(message, { errors })
}

export function validBody<T extends Modules> (body, validations: Validation<T>[]) {
  const errors = validations.map(validation => {
    const { attribute, rules } = validation

    const sometimesRuleRule = rules.find(({ rule }) => rule === 'sometimes')

    if (sometimesRuleRule) {
      const isSometimes = new SometimesValidator(body, rules, attribute as (keyof Modules))
      const validateSometimes = isSometimes.valid()
      if (validateSometimes) return validateSometimes

    } else {
      const isRequired = new RequiredValidator(body, rules, attribute as (keyof Modules))
      const validateRequired = isRequired.valid()
      if (validateRequired) return validateRequired
    }
  }).filter(error => !!error).flat()

  errors.length > 0 && requestFail(errors)
}
