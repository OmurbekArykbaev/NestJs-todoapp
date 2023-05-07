export interface TodoInterface {
  id: number;
  title: string;
  isDone: boolean;
  // status: Status;
}

export enum Status {
  FINISHED = 'finished',
  CREATED = 'created',
}
