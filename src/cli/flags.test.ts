import { describe, expect, it } from 'vitest'
import { expandSingleDashFlags } from './flags.js'

// The real `stop` declaration: one string option and two booleans.
const STOP = {
  tag: { type: 'string' },
  clear: { type: 'boolean', default: false },
  force: { type: 'boolean', default: false },
} as const

const EVAL = {
  tag: { type: 'string' },
  json: { type: 'boolean', default: false },
  desc: { type: 'string', default: '' },
} as const

describe('expandSingleDashFlags', () => {
  it('rewrites a documented single-dash flag into the form parseArgs accepts', () => {
    expect(expandSingleDashFlags(['-tag', 'sep7'], STOP)).toEqual(['--tag', 'sep7'])
  })

  it('rewrites a single-dash boolean, which README documents for stop', () => {
    expect(expandSingleDashFlags(['-force'], STOP)).toEqual(['--force'])
    expect(expandSingleDashFlags(['-clear'], STOP)).toEqual(['--clear'])
  })

  it('does not swallow the token after a boolean flag', () => {
    // A boolean takes no value, so what follows is another flag and must still
    // be expanded. Both orders have to reach parseArgs fully rewritten.
    expect(expandSingleDashFlags(['-force', '-tag', 't'], STOP)).toEqual(['--force', '--tag', 't'])
    expect(expandSingleDashFlags(['-tag', 't', '-force'], STOP)).toEqual(['--tag', 't', '--force'])
  })

  it('does not rewrite a VALUE that happens to look like a flag', () => {
    // The bug this replaced: normalising by token SHAPE turned
    // `eval -desc -inline` into `--desc --inline`, so a description starting
    // with a dash was parsed as an option and the command failed.
    expect(expandSingleDashFlags(['-desc', '-inline'], EVAL)).toEqual(['--desc', '-inline'])
  })

  it('leaves long forms and unknown tokens alone', () => {
    expect(expandSingleDashFlags(['--tag', 'x'], STOP)).toEqual(['--tag', 'x'])
    expect(expandSingleDashFlags(['-nope', 'x'], STOP)).toEqual(['-nope', 'x'])
  })

  it('leaves a value that is not flag-shaped alone', () => {
    expect(expandSingleDashFlags(['-desc', 'inline the hot loop'], EVAL)).toEqual([
      '--desc',
      'inline the hot loop',
    ])
  })
})
