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
    name: "Khalil Pharmacy",
    locationUrl: "https://maps.app.goo.gl/6RKS9GXwgvyvQGLF7",

    phoneNumber: "034226181",
    geoLocationParams:
      "https://www.google.com/maps/place/%D8%B5%D9%8A%D8%AF%D9%84%D9%8A%D8%A9+%D8%AE%D9%84%D9%8A%D9%84%E2%80%AD/@31.2184607,29.9493803,17z/data=!3m1!4b1!4m6!3m5!1s0x14f5c52111f98281:0x4fa4ff94d20fbfd7!8m2!3d31.2184607!4d29.9493803!16s%2Fg%2F11gr61c147?entry=ttu&g_ep=EgoyMDI1MDEyNy4wIKXMDSoASAFQAw%3D%3D", // Your map URL
  },
  {
    name: " اسامة الطيبى",
    locationUrl: "https://maps.app.goo.gl/CtUHG4C8CvkKY3Dq7",
    whatsappNumber: "+2011 01116840",
    phoneNumber: "+2011 01116840",
    geoLocationParams:
      "https://www.google.com/maps/place/%D8%B5%D9%8A%D8%AF%D9%84%D9%8A%D8%A7%D8%AA+%D8%AF.+%D8%A7%D8%B3%D8%A7%D9%85%D8%A9+%D8%A7%D9%84%D8%B7%D9%8A%D8%A8%D9%89%D8%8C+21+%D8%B4+%D9%85%D8%AD%D9%85%D8%AF+%D9%81%D8%B1%D9%8A%D8%AF+%D8%A8%D8%B1%D8%AC+%D8%A7%D9%84%D9%82%D8%B5%D8%B1+%D8%A7%D9%84%D9%85%D9%84%D9%83%D9%89+%D8%A7%D9%85%D8%A7%D9%85+%D8%A8%D9%89.%D8%AA%D9%83+%D9%88%D9%8A%D9%86%D8%AC%D8%AA%E2%80%AD/data=!4m2!3m1!1s0x14f5c4c4d67676cb:0xf8850fece4c6abc0?utm_source=mstt_1&entry=gps&coh=192189&g_ep=CAESBjI1LjQuMRgAINeCAyp1LDk0MjU1NDQ1LDk0MjQyNjE2LDk0MjIzMjk5LDk0MjE2NDEzLDk0MjEyNDk2LDk0MjA3Mzk0LDk0MjA3NTA2LDk0MjA4NTA2LDk0MjE3NTIzLDk0MjE4NjUzLDk0MjI5ODM5LDQ3MDg0MzkzLDk0MjEzMjAwQgJFRw%3D%3D&skid=df7ce75e-3281-4d63-bb6b-d756e27dce66", // Your map URL
  },
  {
    name: "Ayman Balbaa Pharmacy",
    locationUrl: "https://maps.app.goo.gl/kuxguWVzedCEW72z6",
    whatsappNumber: "+2011 01116840",
    phoneNumber: "+2011 01116840",
    geoLocationParams:
      "https://www.google.com/maps/place/Dr.+Ayman+Balbaa+Pharmacy,+131+Albert+Al+Awal,+Ezbet+Saad,+Sidi+Gaber,+Alexandria+Governorate+5432061/data=!4m2!3m1!1s0x14f5c48e2bdc7ba5:0xb3b5dd3e5352d06e?utm_source=mstt_1&entry=gps&coh=192189&g_ep=CAESBjI1LjQuMRgAINeCAyp1LDk0MjU1NDQ1LDk0MjQyNjE2LDk0MjIzMjk5LDk0MjE2NDEzLDk0MjEyNDk2LDk0MjA3Mzk0LDk0MjA3NTA2LDk0MjA4NTA2LDk0MjE3NTIzLDk0MjE4NjUzLDk0MjI5ODM5LDQ3MDg0MzkzLDk0MjEzMjAwQgJFRw%3D%3D&skid=1eea8fbe-2e64-4241-98bd-e017fb7309f0",
  },
  {
    name: "El Ezaby Pharmacy",
    locationUrl: "https://maps.app.goo.gl/CJAXSk4CS9ykUzrA7",

    phoneNumber: "0235317347",
    geoLocationParams:
      "https://www.google.com/maps/place/El+Ezaby+Pharmacy/@31.2294954,29.9503682,17z/data=!3m1!4b1!4m6!3m5!1s0x14f5c4e804179e11:0x991ab03e90eb6ed2!8m2!3d31.2294954!4d29.9503682!16s%2Fg%2F11csqhl4p9?entry=ttu&g_ep=EgoyMDI1MDEyNy4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    name: "15252 pharmacy",
    locationUrl: "https://maps.app.goo.gl/bamneFcDHcJYwUYcA",

    phoneNumber: "15252",
    geoLocationParams:
      "https://www.google.com/maps/place/%D8%B5%D9%8A%D8%AF%D9%84%D9%8A%D8%A7%D8%AA+%D8%A7%D9%84%D8%AF%D9%88%D8%A7%D8%A1%D8%8C+%D8%B4%D8%A7%D8%B1%D8%B9+302+%D8%A7%D9%84%D8%A7%D8%B3%D9%83%D9%86%D8%AF%D8%B1%D9%8A%D8%A9%D8%8C+%D8%B3%D9%85%D9%88%D8%AD%D8%A9,+Sidi+Gaber,+Alexandria+Governorate%E2%80%AD/data=!4m2!3m1!1s0x14f5c493d721a17d:0x8739b7f7d0338d63?utm_source=mstt_1&entry=gps&coh=192189&g_ep=CAESBjI1LjQuMRgAIIgnKnUsOTQyNTU0NDUsOTQyNDI2MTYsOTQyMjMyOTksOTQyMTY0MTMsOTQyMTI0OTYsOTQyMDczOTQsOTQyMDc1MDYsOTQyMDg1MDYsOTQyMTc1MjMsOTQyMTg2NTMsOTQyMjk4MzksNDcwODQzOTMsOTQyMTMyMDBCAkVH&skid=8c34898e-fb31-4428-8cec-20022c5d4d69",
  },
  {
    name: "Delmar and Attalla Pharmacies - Al Beitash",
    locationUrl: "https://maps.app.goo.gl/VX41hBQmhCXw9Za2A",
    whatsappNumber: "+2010 02199551",
    phoneNumber: "+2010 02199551",
    geoLocationParams:
      "https://www.google.com/maps/place/Delmar+and+Attalla+Pharmacies+-+Al+Beitash/@31.1286264,29.7817666,17z/data=!3m1!4b1!4m6!3m5!1s0x14f595e411877945:0xec42fbe0a464bb35!8m2!3d31.1286264!4d29.7817666!16s%2Fg%2F11vrxftgjy?entry=ttu&g_ep=EgoyMDI1MDEyNy4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    name: "Ahmed Maher Pharmacy",
    locationUrl: "https://maps.app.goo.gl/2i2BEyrW3R7gEaNp6",

    phoneNumber: "03 4224188",
    geoLocationParams:
      "https://www.google.com/maps/place/Ahmed+Maher+Pharmacy,+Elshohada+Square+Rd,+Ezbet+Saad,+Sidi+Gaber,+Alexandria+Governorate+5432092/data=!4m2!3m1!1s0x14f5c4c7f5aad78b:0xc4e58e0b7198350e?utm_source=mstt_1&entry=gps&coh=192189&g_ep=CAESBjI1LjQuMRgAINeCAyp1LDk0MjU1NDQ1LDk0MjQyNjE2LDk0MjIzMjk5LDk0MjE2NDEzLDk0MjEyNDk2LDk0MjA3Mzk0LDk0MjA3NTA2LDk0MjA4NTA2LDk0MjE3NTIzLDk0MjE4NjUzLDk0MjI5ODM5LDQ3MDg0MzkzLDk0MjEzMjAwQgJFRw%3D%3D&skid=41d064f9-8cbc-42dc-b4a9-0b4a5e973c54",
  },
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
    <div className="flex flex-col min-h-screen pt-[120px]">
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
