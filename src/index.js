import NikolayCommander from "./NikolayCommander.js"

const ARG_USER_NAME = "--username="

const t = process.argv.find(v => v.startsWith(ARG_USER_NAME))
const userName = t ? t.slice(ARG_USER_NAME.length) : "Neanderthal"

console.log(`\n\nWelcome to the File Manager, ${userName}!\n\n`)
process.on("exit", () => console.log(`\n\nThank you for using File Manager, ${userName}, goodbye!\n\n`))

new NikolayCommander().start()
