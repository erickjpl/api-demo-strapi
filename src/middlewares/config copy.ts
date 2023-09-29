import { errors } from '@strapi/utils'
import { MessageRulesEN, Modules, Rule, RuleConfig, Validation, ValidationError } from './interfaces'
const { ValidationError } = errors

function requestFail<T extends Modules> (errors: ValidationError<T>[]) {
  const message = errors.length === 1 ? errors[0].message : `${errors.length} errors occurred.`
  throw new ValidationError(message, { errors })
}

export function validBody<T extends Modules> (body, validations: Validation<T>[]) {
  const errors = validations.map(validation => {
    const { attribute, rules } = validation
    const property = getPropertyIfExist(body, attribute)

    const sometimes = isSometimes(rules, attribute, body)
    if (sometimes) return sometimes

    const hsaRequired = isRequired(rules, attribute, property)
    if (hsaRequired) return hsaRequired

    const errors = rules.map(rule => {
      const { rule: ruleName, value: ruleValue, message } = rule

      const error = validate(property, ruleName, ruleValue)
      return error ? { path: [attribute], message: message || MessageRulesEN[ruleName].replace(':attribute', String(attribute)).replace(':value', String(ruleValue)), name: 'ValidationError' } : null
    }).filter(error => !!error)

    return errors.length > 0 ? errors : undefined
  }).filter(error => !!error).flat()

  errors.length > 0 && requestFail(errors)
}

function getPropertyIfExist<T extends Modules> (body: T, attribute: (keyof T)): T[keyof T] | undefined {
  const exists = attribute in body

  return !exists ? undefined : body[attribute]
}

function validPropertyValue<T extends Modules> (propertyValue?: T[keyof T]) {
  return (typeof propertyValue === 'undefined') ||
    (typeof propertyValue === 'object' && Object.keys(propertyValue).length === 0) ||
    (typeof propertyValue === 'string' && propertyValue.length === 0)
}

function isSometimes<T extends Modules> (rules: RuleConfig<Rule>[], attribute: (keyof T), body: T): undefined | ValidationError<T> {
  const sometimesRule = rules.find(({ rule }) => rule === 'sometimes')

  if (!sometimesRule)
    return undefined

  const property = attribute in body
  const invalid = validPropertyValue(body[attribute])

  return property && invalid
    ? {
      path: [attribute],
      message: MessageRulesEN.required.replace(':attribute', String(attribute)),
      name: 'ValidationError'
    }
    : undefined
}

function isRequired<T extends Modules> (rules: RuleConfig<Rule>[], attribute: (keyof T), propertyValue?: T[keyof T]): undefined | ValidationError<T> {
  const requiredRule = rules.find(({ rule }) => rule === 'required')
  const invalid = validPropertyValue(propertyValue)

  if (requiredRule && invalid) {
    return {
      path: [attribute],
      message: MessageRulesEN.required.replace(':attribute', String(attribute)),
      name: 'ValidationError'
    }
  }

  return undefined
}

function validate (property, ruleName, ruleValue) {
  const digits: number = property
    ? typeof property === 'number'
      ? property
      : property.toString().length
    : 0

  switch (ruleName) {
    case 'digits':
      return property.toString().length !== ruleValue
    case 'email':
      return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(property)
    case 'filled':
      return !property
    case 'gt':
      return property <= ruleValue
    case 'gte':
      return property < ruleValue
    case 'integer':
      return !Number.isInteger(property)
    case 'lt':
      return property >= ruleValue
    case 'lte':
      return property > ruleValue
    case 'max':
      return property > ruleValue
    case 'max_digits':
      return digits > ruleValue
    case 'min':
      return property < ruleValue
    case 'min_digits':
      return digits < ruleValue
    case 'nullable':
      return property === null
    case 'numeric':
      return !Number.isFinite(property)
    case 'password':
      return false
    case 'size':
      return digits === ruleValue
    case 'string':
      return typeof property === 'string'
    case 'relation_creating':
      return !property || property.connect.length === 0
    case 'relation_updating':
      if (property) {
        const connect = 'connect' in property
        const disconnect = 'disconnect' in property

        if (connect && disconnect)
          return property.connect.length > 0 && property.disconnect.length === 0

        return true
      }

      return false
  }
}
