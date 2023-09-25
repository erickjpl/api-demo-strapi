import { errors } from '@strapi/utils'
const { ValidationError } = errors

export enum TYPE_VALIDATION_RELATION { CREATE = 'create', UPDATE = 'update' }
export enum METHOD {
  POST = 'POST',
  PUT = 'PUT',
}
enum MessageRulesES {
  digits = 'El campo :attribute debe tener una longitud exacta de :value.',
  email = 'El campo :attribute debe tener el formato de una dirección de correo electrónico.',
  filled = 'El campo :attribute no debe estar vacío cuando esté presente.',
  gt = 'El campo :attribute debe ser mayor que :value.',
  gte = 'El campo :attribute debe ser mayor o igual que :value.',
  integer = 'El campo :attribute debe ser un número entero.',
  lt = 'El campo :attribute debe ser menor que :value.',
  lte = 'El campo :attribute debe ser menor o igual que :value.',
  max = 'El campo :attribute debe ser menor o igual a :value.',
  max_digits = 'El campo :attribute debe tener una longitud máxima de :value.',
  min = 'El campo :attribute debe ser mayor o igual a :value.',
  min_digits = 'El campo :attribute debe tener una longitud mínima de :value.',
  nullable = 'El campo :attribute puede ser nulo.',
  numeric = 'El campo :attribute debe ser numérico.',
  password = 'La contraseña no coincide con la contraseña del usuario autenticado.',
  present = 'El campo :attribute debe existir en los datos de entrada.',
  required = 'El campo :attribute debe estar presente en los datos de entrada y no vacío.',
  size = 'El campo :attribute debe tener un tamaño de :value.',
  string = 'El campo :attribute debe ser una cadena.',
  sometimes = 'La validación no se aplica.'
}
enum MessageRulesEN {
  digits = 'The :attribute field must have an exact length of :value.',
  email = 'The :attribute field must have the format of an email address.',
  filled = 'The :attribute field must not be empty when present.',
  gt = 'The :attribute field must be greater than :value.',
  gte = 'The :attribute field must be greater than or equal to :value.',
  integer = 'The :attribute field must be an integer.',
  lt = 'The :attribute field must be less than :value.',
  lte = 'The :attribute field must be less than or equal to :value.',
  max = 'The :attribute field must be less than or equal to :value.',
  max_digits = 'The :attribute field must have a maximum length of :value.',
  min = 'The :attribute field must be greater than or equal to :value.',
  min_digits = 'The :attribute field must have a minimum length of :value.',
  nullable = 'The :attribute field can be null.',
  numeric = 'The :attribute field must be numeric.',
  password = 'The password does not match the authenticated password.',
  present = 'The :attribute field must exist in the input data.',
  required = 'The :attribute field must be present in the input data and not empty.',
  size = 'The :attribute field must have a size of :value.',
  string = 'The :attribute field must be a string.',
  sometimes = 'The validation does not apply.'
}

type Modules = Inventory
type TYPE_STATUS = 'Active' | 'Inactive' | 'Sold Out'
type TYPE_VALIDATION = 'create' | 'update'
export type METHOD_HTTP = 'POST' | 'PUT'
type Rule =
  'digits' |
  'email' |
  'filled' |
  'gt' |
  'gte' |
  'integer' |
  'lt' |
  'lte' |
  'max' |
  'max_digits' |
  'min' |
  'min_digits' |
  'nullable' |
  'numeric' |
  'password' |
  'present' |
  'required' |
  'size' |
  'string' |
  'sometimes'

type RuleValue =
  'digits' |
  'max' |
  'max_digits' |
  'min' |
  'min_digits' |
  'size' |
  'gt' |
  'gte' |
  'lt' |
  'lte'

export interface Config { path: string[], method: string, relationsRequired: string[], propertiesRequired: string[] }

type RuleConfig<R extends Rule> = R extends RuleValue
  ? { rule: R; value: number; message?: string }
  : { rule: R; value?: number; message?: string };

interface Validation {
  attribute: string
  rules: RuleConfig<Rule>[]
}

export interface ConfigT { path: string[], method: string, validations: Validation[] }

interface Position { before: number, after: number, start: boolean, end: boolean }
interface Reordering { id: number, position?: Position }
interface Relations { connect: Reordering[] | number[], disconnect: Reordering[] | number[] }
interface ValidationError<T extends Modules> {
  path: (keyof T)[];
  message: string;
  name: string;
}
interface Inventory {
  warehouse: Relations
  product: Relations
  available: number
  status?: TYPE_STATUS
}

export function checkPropertyExistsInBody<T extends Modules> (body: T, properties: (keyof T)[]) {
  const errors = properties.map(property => {
    const exists = property in body
    if (!exists) {
      return {
        path: [property],
        message: `${String(property)} must be defined.`,
        name: 'ValidationError'
      }
    }
  }).filter(error => !!error)

  errors.length > 0 && requestFail(errors)
}

export function validateRelations<T extends Modules> (body: T, relations: (keyof T)[], typeValidation: TYPE_VALIDATION = 'update') {
  const properties = typeValidation === TYPE_VALIDATION_RELATION.CREATE ? relations : relations.filter((property) => property in body)

  const errors = properties.length && properties.map(property => {
    const data = body[property] as Relations

    if (!data || !data.connect || data.connect.length === 0) {
      return {
        path: [property],
        message: `${String(property)} must be defined.`,
        name: 'ValidationError'
      }
    }
  }).filter(error => !!error)

  errors.length > 0 && requestFail(errors)
}

function requestFail<T extends Modules> (errors: ValidationError<T>[]) {
  const message = errors.length === 1 ? errors[0].message : `${errors.length} errors occurred.`
  throw new ValidationError(message, { errors })
}
