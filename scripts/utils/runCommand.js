const { spawn } = require('child_process')

module.exports = async function (command) {
  return new Promise((resolve, reject) => {
    const [cmd, ...args] = command.split(' ')
    const proc = spawn(cmd, args)

    proc.stdout.on('data', data => {
      console.log(`[${command}] ${data}`)
    })

    proc.stderr.on('data', data => {
      console.error(`[${command}] ${data}`)
    })

    proc.on('close', code => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`[${command}] exited with code: ${code}`))
      }
    })

    proc.on('error', err => reject(err))
  })
}
