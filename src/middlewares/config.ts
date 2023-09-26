import { errors } from '@strapi/utils'
import { MessageRulesEN, Modules, Rule, RuleConfig, Validation, ValidationError } from './interfaces'
const { ValidationError } = errors

function requestFail<T extends Modules> (errors: ValidationError<T>[]) {
  const message = errors.length === 1 ? errors[0].message : `${errors.length} errors occurred.`
  throw new ValidationError(message, { errors })
}

export function validBody<T extends Modules> (body, validations: Validation<T>[]) {
  validations.forEach(validation => {
    const { attribute, rules } = validation
    const property = getPropertyIfExist(body, attribute)

    const sometimes = isSometimes(rules, attribute, property)
    if (sometimes) return sometimes
    const required = isRequired(rules, attribute, property)
    if (require) return required

    const errors = rules.map(rule => {
      const { rule: ruleName, value: ruleValue, message } = rule

      const error = validate(property, ruleName, ruleValue)
      return error ? { path: [attribute], message: message || MessageRulesEN[ruleName].replace(':attribute', String(property)).replace(':value', String(ruleValue)), name: 'ValidationError' } : null
    }).filter(error => !!error)

    errors.length > 0 && requestFail(errors)
  })
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

function isSometimes<T extends Modules> (rules: RuleConfig<Rule>[], attribute: (keyof T), propertyValue?: T[keyof T]): undefined | ValidationError<T> {
  const sometimesRule = rules.find(({ rule }) => rule === 'sometimes')
  const invalid = validPropertyValue(propertyValue)

  if (sometimesRule && invalid) {
    return {
      path: [attribute],
      message: MessageRulesEN.sometimes.replace(':attribute', String(attribute)),
      name: 'ValidationError'
    }
  }

  return undefined
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
      return property.toString().length > ruleValue
    case 'min':
      return property < ruleValue
    case 'min_digits':
      return property.toString().length < ruleValue
    case 'nullable':
      return property === null
    case 'numeric':
      return !Number.isFinite(property)
    case 'password':
      return false
    case 'present':
      return false
    case 'required':
      return false
    case 'size':
      return false
    case 'string':
      return typeof property === 'string'
  }
}
