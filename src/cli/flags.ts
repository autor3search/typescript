import type { ParseArgsConfig } from 'node:util'

type Options = NonNullable<ParseArgsConfig['options']>

/**
 * Rewrites the single-dash multi-character flags this tool documents into the
 * long form `parseArgs` accepts.
 *
 * Node's `parseArgs` takes a single dash only for a single-character option
 * name, so `-tag` fails with "Unknown option '-t'" and `-desc` with "Unknown
 * option '-d'". Every command here documents the single-dash spelling --
 * program.md tells the agent to run `eval -desc "..."`, and README tells the
 * human to run `stop -force` -- so the tokens are normalised before parsing
 * rather than changing a contract an agent already follows.
 *
 * The parseArgs OPTIONS are the input, not a pattern, and that is the point.
 * Each command used to normalise with `/^-[A-Za-z][A-Za-z-]+$/`, which asks
 * what a token LOOKS like rather than what the command actually accepts, so a
 * VALUE shaped like a flag was rewritten too: `eval -desc -inline` became
 * `--desc --inline`, and the description turned into an unknown option. Asking
 * the declaration instead means only a real flag is ever rewritten.
 *
 * Whether a flag consumes the token after it comes from its declared `type`.
 * A boolean takes no value, so the token after one is another flag and must
 * still be expanded -- `stop -force -tag t` has to reach parseArgs with both
 * rewritten. Single-character names are left alone, since parseArgs already
 * accepts them in single-dash form.
 */
export function expandSingleDashFlags(argv: readonly string[], options: Options): string[] {
  const expandable = new Map<string, boolean>(
    Object.entries(options)
      .filter(([name]) => name.length > 1)
      .map(([name, opt]) => [`-${name}`, opt.type !== 'boolean']),
  )
  let expectingValue = false
  return argv.map((token) => {
    if (expectingValue) {
      expectingValue = false
      return token
    }
    const takesValue = expandable.get(token)
    if (takesValue !== undefined) {
      expectingValue = takesValue
      return `--${token.slice(1)}`
    }
    return token
  })
}
