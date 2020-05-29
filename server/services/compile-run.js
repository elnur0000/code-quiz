const { python, cpp, java, c, node } = require('compile-run')

module.exports = (language, stdin, code) => {
  switch (language) {
    case 'python':
      return python.runSource(code, { stdin })

    case 'java':
      return java.runSource(code, { stdin })

    case 'cpp':
      return cpp.runSource(code, { stdin })

    case 'c':
      return c.runSource(code, { stdin })

    case 'node':
      return node.runSource(code, { stdin })
  }
}
