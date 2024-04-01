import { Realm } from '@realm/react';

export default class TaskSchema extends Realm.Object {
  id!: number;
  title!: string;
  description?: string;
  imageUrl?: string;

  constructor(realm: Realm, id: number, title: string, description: string | null, imageUrl: string | null) {
    super(realm, {
      id,
      title,
      description,
      imageUrl,
    });
  }

  static schema = {
    name: 'Task',
    primaryKey: 'id',
    properties: {
      id: 'int',
      title: 'string',
      description: 'string?',
      imageUrl: 'string?',
    },
  };
}
