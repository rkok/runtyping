import { Type } from 'ts-morph'
import generateOrReuseType from './generateOrReuseType'
import RuntypeGenerator from './RuntypeGenerator'
import simpleTypeGenerator from './simple'
import sortUndefinedFirst from './sortUndefinedFirst'
import { Write } from './symbols'

export default function* intersecionTypeGenerator(
  type: Type
): RuntypeGenerator {
  const [first, ...rest] = type.getIntersectionTypes().sort(sortUndefinedFirst)

  if (!first) return yield* simpleTypeGenerator('Undefined')

  yield* generateOrReuseType(first)
  for (const item of rest) {
    yield [Write, '.And(']
    yield* generateOrReuseType(item)
    yield [Write, ')']
  }
}
