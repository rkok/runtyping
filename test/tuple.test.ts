import generateFixture from './generateFixture'

test('tuple', async () => {
  expect((await generateFixture('tuple', ['A', 'B'])).getText())
    .toMatchInlineSnapshot(`
    "import { Tuple, Number, String, Static } from 'runtypes';

    export const A = Tuple(Number, String, Number,);

    export type A = Static<typeof A>;

    export const B = Tuple(A, A,);

    export type B = Static<typeof B>;
    "
  `)
})
