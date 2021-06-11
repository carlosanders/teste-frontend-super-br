import {InMemoryDbService} from 'angular-in-memory-web-api';

import {TodoFakeDb} from 'app/fake-db/todo';

export class FakeDbService implements InMemoryDbService
{
    createDb(): any
    {
        return {
            'todo-todos'  : TodoFakeDb.todos,
            'todo-filters': TodoFakeDb.filters,
            'todo-tags'   : TodoFakeDb.tags,
        };
    }
}
