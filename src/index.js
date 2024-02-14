import chalk from "chalk"
import { NikolayCommander } from "./NikolayCommander.js"
import { getArgValue } from "./utils/utils.js"

const userName = getArgValue("username") || "Neanderthal"

process.on("exit", () => console.log(chalk.green(`\n\nThank you for using File Manager, ${userName}, goodbye!\n\n`)))
console.log(chalk.green(`\n\nWelcome to the File Manager, ${userName}!\n`))

new NikolayCommander().start()
