"use client";

import { Store as StoreIcon } from "lucide-react";

import {
  Map,
  MapMarker,
  useKakaoLoader,
  MapInfoWindow,
} from "react-kakao-maps-sdk";

import { useState, useEffect } from "react";

interface Store {
  storeId: number;
  name: string;
  latitude: number;
  longitude: number;
  category: string;
}

interface StoreMapProps {
  initialStores: Store[];
  currentLocation?: { latitude: number; longitude: number };
}

export default function KakaoMap({
  initialStores,
  currentLocation,
}: StoreMapProps) {
  useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_MAPS_APP_KEY!,
    libraries: ["services", "clusterer", "drawing"],
  });

  const [stores, setStores] = useState<Store[]>(initialStores);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [hoveredStoreId, setHoverStoreId] = useState<number | null>(null);
  //const [isInfoOpen, setIsInfoOpen] = useState(false);

  const initialCenter = currentLocation
    ? { lat: currentLocation.latitude, lng: currentLocation.longitude }
    : stores.length > 0
    ? {
        lat: stores[0].latitude,
        lng: stores[0].longitude,
      }
    : {
        lat: 37.4444053361,
        lng: 126.7992573088,
      };

  useEffect(() => {
    setStores(initialStores);
  }, [initialStores]);

  const handleMarkerClick = (store: Store) => {
    setSelectedStore(store);
    //setIsInfoOpen(true);
  };

  // const handleCloseModal = () => {
  //   setIsInfoOpen(false);
  //   setSelectedStore(null);
  // };

  return (
    <div className="h-[calc(100vh-64px)] relative">
      <Map center={initialCenter} className="w-full h-full" level={4}>
        {stores.map((store) => (
          <MapMarker
            key={store.storeId}
            position={{ lat: store.latitude, lng: store.longitude }}
            clickable={true}
            onClick={() => handleMarkerClick(store)}
            onMouseOver={() => setHoverStoreId(store.storeId)}
            onMouseOut={() => setHoverStoreId(null)}
          >
            <div className="w-8 h-8 bg-emerald-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
              <StoreIcon className="w-4 h-4 text-white" />
            </div>

            {hoveredStoreId === store.storeId && (
              <MapInfoWindow
                position={{ lat: store.latitude, lng: store.longitude }}
                disableAutoPan={true}
                removable={false}
              >
                <div>
                  <div>{store.name}</div>
                  <div>{store.category}</div>
                </div>
              </MapInfoWindow>
            )}
          </MapMarker>
        ))}

        {currentLocation && (
          <MapMarker
            position={{
              lat: currentLocation.latitude,
              lng: currentLocation.longitude,
            }}
            clickable={false}
          >
            <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
          </MapMarker>
        )}
      </Map>
    </div>
  );
}
