// types/store.ts
export interface Store {
  storeId: number;
  name: string;
  latitude: number;
  longitude: number;
  categoryName: string;
  isOpenNow: boolean;
  address: string;
  distance: number;
  openTime: string;
  closeTime: string;
  phoneNumber: string;
  imageUrl: string | null;
  icon?: string;
}
