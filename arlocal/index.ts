import Arlocal from 'arlocal';
import readline from 'readline';
const arlocal = new Arlocal();


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

async function runArlocal() {
  await arlocal.start();
}

async function breakProcessCommand(): Promise<string> {
  return new Promise((resolve) => {
    rl.question("Type 'Quit' to exit Arlocal development environment: \n ", (ans) => {
      resolve(ans);
    })
  })
}

async function run() {
  await runArlocal();

  let answer = "";
  while (answer !== "Quit") {
    answer = await breakProcessCommand();
  }

  await arlocal.stop();  
  process.exit();
}


run();