const { python, cpp, java, c, node } = require('compile-run')

exports.runCode = (language, stdin, code) => {
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

exports.runCodeAgainstTestcase = async (language, stdin, code, expectedStdout) => {
  const result = await this.runCode(language, stdin, code)
  if (result.sterr) return result
  return {
    passed: result.stdout.trim() === expectedStdout.trim(),
    stdin,
    expectedStdout,
    ...result
  }
}
