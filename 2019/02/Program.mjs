import * as defaultOperations from './operations';

class Program {
  constructor(source, operations = defaultOperations) {
    this.source = source;
    this.operations = Object.values(operations);
    this.reset();
  }

  reset() {
    this.memory = [...this.source];
    this.pointer = 0;
    this.opcode = null;
    this.modes = [];
    this.halt = false;
    this.inputs = [];
    this.outputs = [];
    this.relativeBase = 0;
  }

  override({ noun, verb } = {}) {
    this.reset();
    this.memory[1] = noun;
    this.memory[2] = verb;
  }

  read() {
    return this.memory[this.pointer++] || 0;
  }

  value() {
    return this.resolve();
  }

  ref() {
    return this.resolve({ ref: true });
  }

  resolve({ ref = false } = {}) {
    let value = this.read();
    const mode = this.modes.shift() || 0;
    if (mode === 1) {
      return value;
    }
    if (mode === 2) {
      value = this.relativeBase + value;
    }
    if (!ref) {
      return this.memory[value] || 0;
    }
    return value;
  }

  async run() {
    while (!this.halt) {
      const opcode = String(this.read());
      this.opcode = +opcode.slice(-2);
      this.modes = opcode.slice(0, -2).split('').reverse().map(Number);
      const operation = this.operations.find(op => op.opcode === this.opcode);
      if (!operation) {
        throw new Error(`Unknown opcode: ${this.opcode} @ ${this.pointer}`);
      }
      await operation(this);
    }
  }

  // Diagnostic test by verifying outputs
  test() {
    const diagcode = this.outputs.pop();
    for (const [index, output] of this.outputs.entries()) {
      if (output !== 0) {
        throw new Error(`Diag test failed: ${output} @ ${index}`);
      }
    }
    return diagcode;
  }

  static from(input, operations) {
    const source = input.split(',').map(Number);
    return new Program(source, operations);
  }
}

export default Program;
