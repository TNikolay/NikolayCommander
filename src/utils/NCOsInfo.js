import os from "os"

export function getSystemInfo(cmd) {
  switch (cmd) {
    case "--EOL":
      console.log("Default system End-Of-Line: ", JSON.stringify(os.EOL))
      break

    case "--cpus":
      {
        const info = os.cpus().map(cpu => ({
          Model: cpu.model.trim().toString(),
          "Clock rate (GHz)": (cpu.speed / 1000).toFixed(1),
        }))
        console.log(`System has ${info.length} cpus`)
        console.table(info)
      }
      break

    case "--homedir":
      console.log(os.homedir())
      break

    case "--username":
      console.log(os.userInfo().username)
      break

    case "--architecture":
      console.log(os.arch())
      break

    default:
      console.log("Invalid input")
  }
}
