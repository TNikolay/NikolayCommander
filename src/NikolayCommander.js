import os from "os"
import path from "path"
import { getSystemInfo } from "./utils/osInfo.js"
import { createInterface } from "readline/promises"

export class NikolayCommander {
  #path

  COMMAND_LIST = {
    up: 1,
    cd: 2,
    ls: 1,
    cat: 2,
    add: 2,
    rn: 3,
    cp: 3,
    mv: 3,
    rm: 2,
    os: 2,
    hash: 2,
    compress: 3,
    decompress: 3,
  }
  constructor(path) {
    this.#path = path || os.homedir()
  }

  async start() {
    const rl = createInterface({ input: process.stdin, output: process.stdout })

    console.log(`You are currently in ${this.#path}\n\n`)

    while (true) {
      const answer = (await rl.question(">> ")).trim()
      if (answer === ".exit") return rl.close()

      const cmd = this.#parseInput(answer)

      if (!cmd || !this.COMMAND_LIST[cmd[0]] || cmd.length !== this.COMMAND_LIST[cmd[0]]) {
        console.log("Invalid input")
        continue
      }

      await this[cmd[0]](cmd)
      console.log(`\n\nYou are currently in ${this.#path}\n\n`)
    }
  }

  async up() {
    this.#path = path.resolve(this.#path, "..")
  }

  async os(cmd) {
    getSystemInfo(cmd[1])
  }

  #parseInput(command) {
    const res = []
    let current = command

    while (current.length) {
      if (current[0] === '"') {
        const index = current.indexOf('"', 1)
        if (index === -1) return [] // not valid input
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
