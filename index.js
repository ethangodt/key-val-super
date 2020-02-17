// TODO upgrade your version of node
// TODO do you need to use babel, or are real modules supported natively in Node yet
const process = require("process");
process.stdin.setEncoding("utf8");

const commands = ["get", "set", "log"];
const store = {};

process.stdin.on("readable", () => {
  let chunk;
  while ((chunk = process.stdin.read()) !== null) {
    let split = chunk.split(" "); // TODO this doesn't handle 'log'
    let cmd = split[0];
    let arg = split[1];
    if (!commands.includes(cmd)) {
      // TODO how the hell do streams work in OS again?
      process.stderr.write(`UNSUPPORTED COMMAND ${cmd}`);
      return;
    } else if (cmd === "set") {
      let splitArg = arg.split("=");
      let key = splitArg[0];
      let val = splitArg[1];
      onSet(key, val);
    } else if (cmd === "get") {
      onGet(arg);
    } else if (cmd === "log") {
      onLog();
    }
  }
});

process.stdin.on("end", () => {
  process.stdout.write("end");
});

function onSet(key, value) {
  store[key] = value;
  process.stdout.write(`Successfully Updated: ${key} = ${value}`);
}

function onGet(key) {
  process.stdout.write(store[key]);
}

function onLog() {
  // TODO get this to work
  process.stdout.write(store.toString());
}
