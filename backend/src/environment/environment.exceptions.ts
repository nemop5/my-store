export class EnvironmentException extends Error {
  constructor(public message: string) {
    super(message);
    this.name = "ENVIRONMENT VARIABLE MISSING";
  }
}
