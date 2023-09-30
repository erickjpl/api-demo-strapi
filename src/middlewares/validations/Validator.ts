import { MessageRulesEN, Modules, Rule, RuleConfig, ValidationError } from "../interfaces"

interface IValidator {
  valid (): undefined | ValidationError<Modules> | ValidationError<Modules>[]
}
interface IRelationships {
  canCreate: boolean
  canUpdate: boolean
  noRelationships: boolean
}

abstract class BaseValidator {
  constructor(
    protected readonly body: Modules,
    protected readonly rules: RuleConfig<Rule>[],
    protected readonly attribute: (keyof Modules)
  ) {
  }

  protected getPropertyValueIfExist (): Modules[keyof Modules] | undefined {
    const exists = this.attribute in this.body

    return !exists ? undefined : this.body[this.attribute]
  }

  protected validPropertyValue (propertyValue) {
    return (typeof propertyValue === 'undefined')
      || (typeof propertyValue === 'object' && Object.keys(propertyValue).length === 0)
      || (typeof propertyValue === 'string' && propertyValue.length === 0)
  }
}

export class SometimesValidator extends BaseValidator implements IValidator {
  valid (): undefined | ValidationError<Modules> | ValidationError<Modules>[] {
    const sometimesRuleRule = this.rules.find(({ rule }) => rule === 'sometimes')

    if (sometimesRuleRule && this.attribute in this.body) {
      const isRequired = new GeneralValidator(this.body, this.rules, this.attribute)
      return isRequired.valid()
    }

    return undefined
  }
}

export class RequiredValidator extends BaseValidator implements IValidator {
  valid (): undefined | ValidationError<Modules> | ValidationError<Modules>[] {
    const propertyValue = this.getPropertyValueIfExist()
    const invalid = this.validPropertyValue(propertyValue)
    const requiredRule = this.rules.find(({ rule }) => rule === 'required')

    if (requiredRule && invalid) {
      return {
        path: [this.attribute],
        message: MessageRulesEN.required.replace(':attribute', String(this.attribute)),
        name: 'ValidationError'
      }
    }

    const validator = new GeneralValidator(this.body, this.rules, this.attribute)
    return validator.valid()
  }
}

class GeneralValidator extends BaseValidator implements IValidator {
  valid (): undefined | ValidationError<Modules>[] {
    const propertyValue = this.getPropertyValueIfExist()

    const errors = this.rules.map(rule => {
      const { rule: ruleName, value: ruleValue, message } = rule

      const error = this.validate(ruleName, ruleValue, propertyValue)
      return error
        ? null
        : {
          path: [this.attribute],
          message: message || MessageRulesEN[ruleName].replace(':attribute', String(this.attribute)).replace(':value', String(ruleValue)),
          name: 'ValidationError'
        }
    }).filter(error => !!error)

    return errors.length > 0 ? errors : undefined
  }

  private getPropertyValueSize (property): number {
    switch (typeof property) {
      case 'undefined':
        return 0
      case 'string':
        return property.length
      case 'number':
        return property
      case 'object':
        return Object.keys(property).length
    }
  }

  private getPropertyRelation (property): IRelationships {
    const object = typeof property === 'object'

    const existConnect = object && 'connect' in property
    const canCreate = existConnect && property.connect.length > 0

    const existDisconnect = object && 'disconnect' in property
    const canUpdate = canCreate && existDisconnect && property.disconnect.length > 0

    const noRelationships = !canCreate && !canUpdate

    return { canCreate, canUpdate, noRelationships }
  }

  private validate (ruleName: Rule, ruleValue: number, property) {
    const isNumber = typeof property === 'number'
    const propertyValueSize = this.getPropertyValueSize(property)
    const propertyRelation = this.getPropertyRelation(property)

    switch (ruleName) {
      case 'digits':
        return isNumber && property === ruleValue
      case 'email':
        return typeof property === 'string' && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(property.toString())
      case 'filled':
        return !!property
      case 'gt':
        return propertyValueSize > ruleValue
      case 'gte':
        return propertyValueSize >= ruleValue
      case 'integer':
        return Number.isInteger(property)
      case 'lt':
        return propertyValueSize < ruleValue
      case 'lte':
        return propertyValueSize <= ruleValue
      case 'max':
        return propertyValueSize <= ruleValue
      case 'max_digits':
        return isNumber && propertyValueSize <= ruleValue
      case 'min':
        return propertyValueSize >= ruleValue
      case 'min_digits':
        return isNumber && propertyValueSize >= ruleValue
      case 'nullable':
        return property === null
      case 'numeric':
        return Number.isFinite(property)
      case 'password':
        return true
      case 'present':
        return !!property
      case 'size':
        return propertyValueSize === ruleValue
      case 'string':
        return typeof property === 'string'
      case 'relation_creating':
        return propertyRelation.canCreate
      case 'relation_updating':
        if (propertyRelation.noRelationships) return true

        return propertyRelation.canUpdate
      default:
        return true
    }
  }
}
