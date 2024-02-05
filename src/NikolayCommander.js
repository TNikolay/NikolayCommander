import fs from "fs/promises"
import path from "path"
import { createInterface } from "readline/promises"
import { pipeline } from "stream/promises"
import { fileURLToPath } from "url"
import { lsDir, isPathExist } from "./utils/NCPath.js"
import { getSystemInfo } from "./utils/osInfo.js"
import { createReadStream, createWriteStream } from "fs"

const __dirname = fileURLToPath(path.dirname(import.meta.url))

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
    //this.#path = path || os.homedir() // TODO
    this.#path = path || __dirname
  }

  async start() {
    const rl = createInterface({ input: process.stdin, output: process.stdout })

    console.log(`You are currently in ${this.#path}\n\n`)

    while (true) {
      const answer = (await rl.question(">> ")).trim()
      if (answer === ".exit") return rl.close()

      try {
        const cmd = this.#parseInput(answer)
        console.log(cmd)
        if (!cmd || !this.COMMAND_LIST[cmd[0]] || cmd.length !== this.COMMAND_LIST[cmd[0]]) {
          console.log("Invalid input\n\n")
          continue
        }

        await this[cmd[0]](cmd)
      } catch (e) {
        console.log("\nOperation failed\n\n")
        console.log("error:  ", e) // TODO
      }

      console.log(`\n\nYou are currently in ${this.#path}\n\n`)
    }
  }

  async up() {
    this.#path = path.resolve(this.#path, "..")
  }

  async cd(cmd) {
    const newPath = path.resolve(this.#path, cmd[1])
    await fs.access(newPath)
    this.#path = newPath
  }

  async ls() {
    await lsDir(this.#path)
  }

  async add(cmd) {
    const src = path.resolve(this.#path, cmd[1])
    await fs.writeFile(src, "", { flag: "wx" })
  }

  async rn(cmd) {
    const oldName = path.join(this.#path, cmd[1])
    const newName = path.join(this.#path, cmd[2])
    if (await isPathExist(newName)) throw new Error("File already exists")
    await fs.rename(oldName, newName)
  }

  async cat(cmd) {
    const file = path.resolve(this.#path, cmd[1])
    const readStream = createReadStream(file)
    await pipeline(readStream, process.stdout, { end: false })
  }

  async rm(cmd) {
    const file = path.resolve(this.#path, cmd[1])
    await fs.rm(file)
  }

  async cp(cmd) {
    const src = path.join(this.#path, cmd[1])
    const dest = path.join(this.#path, cmd[2])
    if (await isPathExist(dest)) throw new Error("File already exists " + dest)

    const srcStream = createReadStream(src)
    const destStream = createWriteStream(dest)
    await pipeline(srcStream, destStream)
  }

  async mv(cmd) {
    this.cp(cmd)
    this.rm(cmd)
  }

  async os(cmd) {
    getSystemInfo(cmd[1])
  }

  #parseInput(command) {
    const res = []
    let current = command

    while (current.length) {
      if (current[0] === '"' || current[0] === "\\") {
        const index = current.indexOf(current[0], 1)
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
