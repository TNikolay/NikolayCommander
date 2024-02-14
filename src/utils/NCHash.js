import crypto from "crypto"
import { createReadStream } from "fs"
import { pipeline } from "stream/promises"

export const calculateHash = async file => {
  const input = createReadStream(file)
  const hash = crypto.createHash("sha256")

  await pipeline(input, hash)
  console.log(hash.digest("hex"))
}
