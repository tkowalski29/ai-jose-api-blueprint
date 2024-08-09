import * as path from "path";

export const binarySplit = (dir: string, model: string): {model: string, filePath: string} => {
  const chars = (model ?? "").split("||");

  return {
    model: chars[1],
    filePath: path.join(dir, chars[0]),
  }
}
