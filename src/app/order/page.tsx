"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import MapEmbed from "@/features/shared/components/googleMapsLocation";
import TopNavBar from "@/features/shared/components/TopNav";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GiPill } from "react-icons/gi";
import { LuBrainCircuit } from "react-icons/lu";
import PharmacyContactCard from "@/features/shared/components/pharamaceyDetails";

const pharmacyDataDetails = [
  {
    name: "El Ezaby Pharmacy",
    locationUrl: "https://goo.gl/maps/1234567890",
    whatsappNumber: "+201006896934",
    phoneNumber: "+201006896934",
    geoLocationParams: "https://www.google.com/maps/place/...", // Your map URL
  },
  {
    name: "19011 Pharmacy",
    locationUrl: "https://goo.gl/maps/abcdef12345",
    whatsappNumber: "+201234567890",
    phoneNumber: "+201234567890",
    geoLocationParams: "https://www.google.com/maps/place/...", // Your map URL
  },
  {
    name: "Seif Pharmacy",
    locationUrl: "https://goo.gl/maps/ghijkl67890",
    whatsappNumber: "+201098765432",
    phoneNumber: "+201098765432",
    geoLocationParams: "https://www.google.com/maps/place/...", // Your map URL
  },
  // Add more pharmacy data as needed
];

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPharmacies, setFilteredPharmacies] =
    useState(pharmacyDataDetails);

  useEffect(() => {
    const filtered = pharmacyDataDetails.filter((pharmacy) =>
      pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPharmacies(filtered);
  }, [searchQuery]);

  return (
    <div className="flex flex-col min-h-screen pt-[100px]">
      <TopNavBar name="Order">
        <div className="flex items-center">
          <div>
            <Link href="/search">
              <Button variant={"destructive"}>
                <GiPill size={24} />
                Search Drugs
              </Button>
            </Link>
            <Link href="https://healthyhousehub.netlify.app" target="_blank">
              <Button variant={"default"} style={{ marginLeft: "1rem" }}>
                <LuBrainCircuit size={24} />
                Talk to ai
              </Button>
            </Link>
          </div>
        </div>
      </TopNavBar>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-xl mx-auto mb-8">
          <Input
            type="text"
            placeholder="Search pharmacy by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPharmacies.map((pharmacy, index) => (
            <div key={index} className="flex justify-center">
              <PharmacyContactCard {...pharmacy} />
            </div>
          ))}

          {filteredPharmacies.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-8">
              No pharmacies found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
