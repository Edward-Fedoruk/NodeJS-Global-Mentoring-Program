import update from './update';

export default (id: string) => update(id, { isDeleted: true });
