import { Type } from 'ts-morph'
import arrayTypeGenerator from './array'
import enumTypeGenerator from './enum'
import functionTypeGenerator from './function'
import intersecionTypeGenerator from './intersection'
import literalTypeGenerator from './literal'
import objectTypeGenerator from './object'
import simpleTypeGenerator from './simple'
import tupleTypeGenerator from './tuple'
import unionTypeGenerator from './union'

export default function factory(type: Type, name?: string) {
  switch (true) {
    case type.isNull():
      return simpleTypeGenerator('Null')

    case type.isString():
      return simpleTypeGenerator('String')

    case type.isNumber():
      return simpleTypeGenerator('Number')

    case type.isBoolean():
      return simpleTypeGenerator('Boolean')

    case type.isArray():
      return arrayTypeGenerator(type)

    case type.isTuple():
      return tupleTypeGenerator(type)

    case type.isEnum():
      return enumTypeGenerator(type)

    case type.isIntersection():
      return intersecionTypeGenerator(type)

    case type.isUnion():
      return unionTypeGenerator(type)

    case type.isLiteral():
      return literalTypeGenerator(type)

    case type.isAny():
    case type.isUnknown():
      return simpleTypeGenerator('Unknown')

    case type.isUndefined():
      return simpleTypeGenerator('Undefined')

    case type.getText() === 'void':
      return simpleTypeGenerator('Void')

    case type.getCallSignatures().length > 0:
      return functionTypeGenerator(type, name)

    case type.isInterface():
    case type.isObject():
      return objectTypeGenerator(type)

    default:
      throw new Error('!!! TYPE ' + type.getText() + ' NOT PARSED !!!')
  }
}
