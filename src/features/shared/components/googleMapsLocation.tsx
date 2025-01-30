import React from "react";

interface MapEmbedProps {
  address?: string;
  mapLink?: string;
}

/**
 * Extracts the actual location (place name or coordinates) from a Google Maps URL.
 */
const extractAddressFromGoogleMapsLink = (link: string): string => {
  try {
    const url = new URL(link);

    // Extract from '/place/' URLs
    if (url.pathname.includes("/place/")) {
      return decodeURIComponent(url.pathname.split("/place/")[1].split("/")[0]);
    }

    // Extract from '/@latitude,longitude' URLs
    if (url.pathname.includes("/@")) {
      const coords =
        url.pathname.split("/@")[1].split(",")[0] +
        "," +
        url.pathname.split("/@")[1].split(",")[1];
      return coords;
    }
  } catch (error) {
    console.warn("Invalid Google Maps link:", link);
  }

  return "Burj Khalifa, Dubai"; // Default fallback
};

export default function MapEmbed({ address, mapLink }: MapEmbedProps) {
  // If mapLink is provided, extract the place from it; otherwise, use address
  const finalAddress = mapLink
    ? extractAddressFromGoogleMapsLink(mapLink)
    : address || "Burj Khalifa, Dubai";

  return (
    <div className="w-full h-96 md:h-80 lg:h-96 xl:h-[500px] p-4">
      <iframe
        className="w-full h-full rounded-lg shadow-lg"
        src={`https://www.google.com/maps?q=${encodeURIComponent(
          finalAddress
        )}&output=embed`}
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
