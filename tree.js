require('tree-cli')({
  base: '.', // or any path you want to inspect.
  noreport: true,
  ignore: [
    'node_modules/',
    'build',
    '.git/',
    '.gitignore',
    'dist/',
    'package-lock.json',
    'package.json',
    'README.md',
    'config',
    'lerna.json',
  ],
  l: 3,
  o: 'tree.txt',
}).then((res) => {
  // res.data is the data for the file tree.
  // res.report is the stringified scanning report.
  // console.log(res.report)
})
