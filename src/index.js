import { NikolayCommander } from "./NikolayCommander.js"
import { getArgValue } from "./utils/utils.js"

const userName = getArgValue("username") || "Neanderthal"

process.on("exit", () => console.log(`\n\nThank you for using File Manager, ${userName}, goodbye!\n\n`))
console.log(`\n\nWelcome to the File Manager, ${userName}!\n\n`)

new NikolayCommander().start()
