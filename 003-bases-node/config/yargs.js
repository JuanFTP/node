const argv = require("yargs")
  .options({
    b: {
      alias: "base",
      type: "number",
      demandOption: true,
      describe: "Value for base of multiplicity table",
    },
    l: {
      alias: "limit",
      type: "number",
      demandOption: false,
      default: 10,
      describe: "Limit to generate multiplicity base",
    },
    s: {
      alias: "show",
      type: "boolean",
      demandOption: false,
      default: false,
      describe: "Show the output wrote in the file created",
    },
  })
  .check((argv, option) => {
    if (isNaN(argv.b) || isNaN(argv.limit)) {
      throw "The base and limit must be a number";
    } else {
      return true;
    }
  }).argv;

module.exports = argv;
