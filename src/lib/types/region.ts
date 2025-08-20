export interface Region {
  id: number;
  name: string;
  parentId: number | null;
  childrenIdList: number[];
}
