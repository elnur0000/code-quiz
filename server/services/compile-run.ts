import {
  python,
  cpp,
  java,
  c,
  node,
  LanguageNames,
  Result,
  Options
} from 'compile-run'

export const runCode = async (language: LanguageNames, stdin: Options['stdin'], code: string): Promise<Result> => {
  switch (language) {
    case 'python':
      return await python.runSource(code, { stdin })
    case 'java':
      return await java.runSource(code, { stdin })
    case 'cpp':
      return await cpp.runSource(code, { stdin })
    case 'c':
      return await c.runSource(code, { stdin })
    case 'node':
      return await node.runSource(code, { stdin })
  }
}
