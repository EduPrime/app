// This script synchronizes and updates all git submodules in the project.
// It ensures that submodule URLs are up to date, initializes and fetches each submodule,
// checks out the correct branch (as defined in .gitmodules or defaults to 'main'), and pulls the latest changes.
// This is useful to keep all submodules in sync with their remote repositories and branches as configured.

import process from 'node:process'

// Generic helper to execute a command as an array of strings
async function exec(cmd: string[]) {
  try {
    const proc = Bun.spawn(cmd, { stdout: 'pipe', stderr: 'pipe' })
    const stdoutPromise = new Response(proc.stdout).text()
    const stderrPromise = new Response(proc.stderr).text()
    await proc.exited // Wait for the process to finish
    const stdout = await stdoutPromise
    const stderr = await stderrPromise
    if (proc.exitCode !== 0) {
      process.stderr.write(stderr || `Unknown error\n`)
      throw new Error(`Command failed with exit code ${proc.exitCode}`)
    }
    process.stdout.write(stdout)
    return { stdout, stderr, exitCode: proc.exitCode }
  }
  catch (err) {
    process.stderr.write(`Error running command: ${cmd.join(' ')}\n${err}\n`)
    throw err
  }
}

// Reads all submodule paths from .gitmodules
async function listPaths(): Promise<string[]> {
  const { stdout } = await exec([
    'git',
    'config',
    '--file',
    '.gitmodules',
    '--get-regexp',
    '^submodule\\..*\\.path$',
  ])
  return stdout
    .trim()
    .split('\n')
    .map(line => line.split(' ')[1])
    .filter(Boolean)
}

// Reads all configured branches for submodules from .gitmodules
async function listBranches(): Promise<Record<string, string>> {
  const { stdout } = await exec([
    'git',
    'config',
    '--file',
    '.gitmodules',
    '--get-regexp',
    '^submodule\\..*\\.branch$',
  ])
  return Object.fromEntries(
    stdout
      .trim()
      .split('\n')
      .map((line) => {
        const [key, val] = line.split(' ')
        const name = key.replace(/^submodule\./, '').replace(/\.branch$/, '')
        return [name, val.replace(/['"]/g, '')]
      }),
  )
}

async function updateSubmodules() {
  try {
    process.stdout.write('🔄 Syncing submodule URLs from .gitmodules…\n')
    await exec(['git', 'submodule', 'sync', '--recursive'])

    const paths = await listPaths()
    const branches = await listBranches()

    for (const p of paths) {
      const branch = branches[p] || 'main'
      process.stdout.write(`📂 ${p}: init + fetch + checkout ${branch}\n`)

      await exec(['git', 'submodule', 'update', '--init', '--recursive', p])
      await exec(['git', '-C', p, 'fetch', 'origin'])
      await exec(['git', '-C', p, 'checkout', branch])
      await exec(['git', '-C', p, 'pull', 'origin', branch])
    }

    process.stdout.write('✅ All submodules have been updated!\n')
  }
  catch (err) {
    process.stderr.write(`Error updating submodules: ${err}\n`)
    process.exit(1)
  }
}

updateSubmodules()
