export function getArgValue(name) {
  const nameEx = `--${name}=`
  const res = process.argv.find(v => v.startsWith(nameEx))
  return res ? res.slice(nameEx.length) : null
}
