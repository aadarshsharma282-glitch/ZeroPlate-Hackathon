import git from 'isomorphic-git';
import fs from 'fs';
import path from 'path';

const dir = process.cwd();

async function initAndCommit() {
  console.log('Initializing Git repository at:', dir);
  await git.init({ fs, dir, defaultBranch: 'main' });

  console.log('Adding remote origin...');
  try {
    await git.addRemote({
      fs,
      dir,
      remote: 'origin',
      url: 'https://github.com/Prashant-Singh-Rawat/ZeroPlate-Hackathon.git',
      force: true,
    });
  } catch (e) {
    console.log('Remote note:', e.message);
  }

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

  console.log(`Staged ${files.length} files.`);

  console.log('Creating commit on main...');
  const sha = await git.commit({
    fs,
    dir,
    author: {
      name: 'ZeroPlate Contributor',
      email: 'contributor@zeroplate.org',
    },
    message: 'feat(settings): redesign settings with Account & Security, General, global dark mode, and multi-language support (English, Hindi, Marathi)',
  });

  console.log('Commit SHA:', sha);

  console.log('Creating branch: feature/settings-appearance-language');
  await git.branch({ fs, dir, ref: 'feature/settings-appearance-language', checkout: true });

  console.log('Git branch created successfully!');
}

initAndCommit().catch((err) => {
  console.error('Error during git init and commit:', err);
});
