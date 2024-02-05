import fs from "fs/promises"

export async function lsDir(path) {
  const list = await fs.readdir(path, { withFileTypes: true })
  const res = list
    .filter(v => v.isDirectory())
    .map(v => ({ Name: v.name, Type: "directory" }))
    .sort()
    .concat(
      list
        .filter(v => v.isFile())
        .map(v => ({ Name: v.name, Type: "file" }))
        .sort()
    )

  console.table(res)
}

export const isPathExist = async path => {
  try {
    await fs.access(path)
    return true
  } catch {
    return false
  }
}
