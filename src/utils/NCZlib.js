import { createReadStream, createWriteStream } from "fs"
import { pipeline } from "stream/promises"
import zlib from "zlib"

export const compressBrotli = async (src, dest) => {
  await pipeline(createReadStream(src), zlib.createBrotliCompress(), createWriteStream(dest))
}
export const decompressBrotli = async (src, dest) => {
  await pipeline(createReadStream(src), zlib.createBrotliDecompress(), createWriteStream(dest))
}
