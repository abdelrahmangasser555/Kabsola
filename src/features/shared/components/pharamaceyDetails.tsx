"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Phone, MapPin, Trash2, Pill, Link } from "lucide-react";
import MapEmbed from "./googleMapsLocation";
import { getCategoryVariant } from "@/features/searchDrug/components/searchBar";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";
const PharmacyContactCard = ({
  locationUrl = "https://goo.gl/maps/example",
  whatsappNumber,
  phoneNumber,
  name,
  geoLocationParams,
}: any) => {
  const [drugs, setDrugs] = useState<any[]>([]);

  // Use whatsapp number as phone number if phone is not provided and vice versa
  const effectivePhoneNumber = phoneNumber || whatsappNumber;
  const effectiveWhatsappNumber = whatsappNumber || phoneNumber;
  const router = useRouter();
  useEffect(() => {
    // Get drugs from localStorage
    const storedDrugs = JSON.parse(localStorage.getItem("cartDrugs") || "[]");
    setDrugs(storedDrugs);
  }, []);

  const handleDelete = (index: number) => {
    const newDrugs = drugs.filter((_: any, i: number) => i !== index);
    setDrugs(newDrugs);
    localStorage.setItem("cartDrugs", JSON.stringify(newDrugs));
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${effectivePhoneNumber}`;
  };

  const handleWhatsAppClick = () => {
    const drugsText = drugs.map((drug) => drug.name).join(", ");
    const message = `I'm interested in the following medications: ${drugsText}`;
    const whatsappUrl = `https://wa.me/${effectiveWhatsappNumber.replace(
      /\D/g,
      ""
    )}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleLocationClick = () => {
    window.open(locationUrl, "_blank");
  };

  return (
    <Card
      className="w-[90%] max-w-md mx-2 mb-5"
      style={{
        marginRight: "5px",
        marginLeft: "5px",
        marginBottom: "20px",
      }}
    >
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          {`${name} Pharmacy details ` || "Details"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-3">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleLocationClick}
          >
            <MapPin className="w-4 h-4" />
            View Location
          </Button>
          <MapEmbed mapLink={geoLocationParams} />

          {effectivePhoneNumber && (
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handlePhoneClick}
            >
              <Phone className="w-4 h-4" />
              Call {effectivePhoneNumber}
            </Button>
          )}

          {effectiveWhatsappNumber && (
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleWhatsAppClick}
            >
              <FaWhatsapp
                className="text-green-500"
                style={{
                  color: "#25d366",
                }}
              />
              WhatsApp
            </Button>
          )}
        </div>

        {drugs?.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Requested Medications:</h3>
            <ScrollArea className="h-40 rounded-md border p-2">
              <div className="space-y-2">
                {drugs?.map((drug: any, index: number) => (
                  <div
                    key={index}
                    className="flex flex-col bg-secondary/20 p-2 rounded-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {drug?.image && (
                          <img
                            src={drug?.image}
                            alt={drug?.name}
                            className="w-10 h-10 object-cover rounded-md"
                            style={{
                              width: "60px",
                              height: "60px",
                            }}
                          />
                        )}
                        <div>
                          <span className="text-sm font-medium">
                            {drug?.name}
                          </span>
                          {drug?.categories && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {drug.categories.map(
                                (category: string, catIndex: number) => (
                                  <Badge
                                    key={catIndex}
                                    variant={getCategoryVariant(category)}
                                    className="text-xs"
                                  >
                                    {category}
                                  </Badge>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(index)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2
                          className="h-4 w-4 text-red-500"
                          style={{
                            color: "#f00",
                          }}
                        />
                      </Button>
                    </div>
                  </div>
                ))}

                <Button
                  variant="default"
                  className="w-full mt-2"
                  onClick={() => router.push("/search")}
                >
                  add more drugs
                  <Pill className="w-4 h-4" />
                </Button>
              </div>
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PharmacyContactCard;
