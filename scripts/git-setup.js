import git from 'isomorphic-git';
import fs from 'fs';
import path from 'path';

const dir = process.cwd();

async function initAndCommit() {
  console.log('Staging all files in repository...');
  const files = [];

  function collectFiles(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      const relPath = path.relative(dir, fullPath).replace(/\\/g, '/');

      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist' || entry.name === '.system_generated') {
        continue;
      }

      if (entry.isDirectory()) {
        collectFiles(fullPath);
      } else if (entry.isFile()) {
        files.push(relPath);
      }
    }
  }

  collectFiles(dir);

  for (const file of files) {
    await git.add({ fs, dir, filepath: file });
  }

  const sha = await git.commit({
    fs,
    dir,
    author: {
      name: 'ZeroPlate Contributor',
      email: 'contributor@zeroplate.org',
    },
    message: 'feat(settings): redesign settings (Account & Security + General) with global dark mode and multilingual support (EN, HI, MR)',
  });

  console.log('Committed to branch. SHA:', sha);
}

initAndCommit().catch((err) => {
  console.error('Error during commit:', err);
});
