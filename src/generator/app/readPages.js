const Observable = require("rxjs").Observable;
const fs = require("../util/fs");

const readPages = path => {
  return fs
    .readdir(path)
    .flatMap(files => files)
    .flatMap(filepath => fs.stat(filepath))
    .map(({ filepath, stats }) => ({
      filepath,
      isDirectory: stats.isDirectory()
    }))
    .filter(
      ({ filepath, isDirectory }) =>
        isDirectory || filepath.endsWith("index.js")
    )
    .flatMap(
      ({ filepath, isDirectory }) =>
        isDirectory ? readPages(filepath) : Observable.of(filepath)
    )
    .flatMap(filepath =>
      fs
        .exists(filepath.replace("index.js", "meta.js"))
        .filter(exists => exists)
        .mapTo(filepath)
    );
};

module.exports = readPages;
