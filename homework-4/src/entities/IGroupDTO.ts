type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

type Group = {
  name: string;
  permissions: Array<Permission>;
}

export default Group;
