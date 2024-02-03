import os from "os"
import { createInterface } from "readline/promises"

export default class NikolayCommander {
  #path

  constructor(path) {
    this.#path = path || os.homedir()
  }

  async start() {
    const rl = createInterface({ input: process.stdin, output: process.stdout })

    console.log(`You are currently in ${this.#path}\n\n`)

    while (true) {
      const answer = await rl.question(">> ")
      const command = this.#parseInput(answer)
      console.log(command)
      if (command[0] === ".exit") return rl.close()

      console.log(`You are currently in ${this.#path}\n\n`)
    }
  }

  #parseInput(command) {
    const res = []
    let current = command.trim()

    while (current.length) {
      if (current[0] === '"') {
        const index = current.indexOf('"', 1)
        if (index === -1) return null // not valid input
        res.push(current.slice(1, index))
        current = current.slice(index + 1).trimStart()
      } else {
        const index = current.indexOf(" ")
        if (index === -1) {
          res.push(current)
          current = ""
        } else {
          res.push(current.slice(0, index))
          current = current.slice(index + 1).trimStart()
        }
      }
    }
    return res
  }
}
//new NikolayCommander().start()
