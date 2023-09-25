import { errors } from '@strapi/utils'
const { ValidationError } = errors

export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

type Modules = Inventory
type TYPE_STATUS = 'Active' | 'Inactive' | 'Sold Out'
type TYPE_VALIDATION = 'create' | 'update'
export type METHOD_HTTP = 'GET' | 'POST' | 'PUT' | 'DELETE'
export enum TYPE_VALIDATION_RELATION { CREATE = 'create', UPDATE = 'update' }

export interface Config { methods: string[], uid: string, module: string, relationsRequired: string[], propertiesRequired: string[] }

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
