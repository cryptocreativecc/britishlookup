"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  lat: number;
  lng: number;
  name: string;
}

export function ListingMap({ lat, lng, name }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Card>
        <CardContent className="p-0 overflow-hidden rounded-[var(--radius-card)]">
          <div className="h-48 bg-surface flex items-center justify-center text-text-muted text-sm">
            Loading map…
          </div>
        </CardContent>
      </Card>
    );
  }

  return <MapInner lat={lat} lng={lng} name={name} />;
}

function MapInner({ lat, lng, name }: Props) {
  const { MapContainer, TileLayer, Marker, Popup } = require("react-leaflet");
  const L = require("leaflet");

  // Fix default marker icon
  const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <Card>
        <CardContent className="p-0 overflow-hidden rounded-[var(--radius-card)]">
          <MapContainer
            center={[lat, lng]}
            zoom={15}
            scrollWheelZoom={false}
            style={{ height: "200px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, lng]} icon={icon}>
              <Popup>{name}</Popup>
            </Marker>
          </MapContainer>
        </CardContent>
      </Card>
    </>
  );
}
