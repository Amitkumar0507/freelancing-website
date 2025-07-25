import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const git = simpleGit();
const path = "./data.json";

const makeCommit = async (n) => {
  if (n === 0) {
    await git.push();
    return;
  }

  const x = random.int(0, 51);
  const y = random.int(0, 6);
  const date = moment().subtract(1, "y").add(1, "d").add(x, "w").add(y, "d").format();

  const data = { date };
  console.log(`Commit #${n}: ${date}`);

  await jsonfile.writeFile(path, data);
  await git.add([path]);
  await git.commit(date, { "--date": date });

  await makeCommit(n - 1);
};

makeCommit(150);
