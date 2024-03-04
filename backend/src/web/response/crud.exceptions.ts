export class EntityDoesNotExist extends Error {
  constructor(entityType: string, id: string) {
    super(`${entityType} with ID: ${id} does not exist.`);
  }
}

export class EntityAlreadyExists extends Error {
  constructor(message: string) {
    super(message);
  }
}
