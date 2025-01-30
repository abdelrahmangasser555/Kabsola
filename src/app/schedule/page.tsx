"use client";
import React from "react";
import { mockDrugs } from "@/features/searchDrug/components/searchBar";
import { useEffect, useState } from "react";
import TopNavBar from "@/features/shared/components/TopNav";
import { Button } from "@/components/ui/button";
import { Pill, PillBottle, Save, Trash2 } from "lucide-react";
import { GiPill } from "react-icons/gi";
import { LuBrainCircuit } from "react-icons/lu";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCategoryVariant } from "@/features/searchDrug/components/searchBar";
export default function Schedule() {
  const [scheduledDrugs, setScheduledDrugs] = useState<
    { id: number; [key: string]: any }[]
  >([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const scheduledDrugs = JSON.parse(
      localStorage.getItem("scheduledDrugs") || "[]"
    );
    setScheduledDrugs(scheduledDrugs);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  function handleDelete(id: number) {
    // remove from state
    const updatedDrugs = scheduledDrugs.filter((drug) => drug?.id !== id);
    setScheduledDrugs(updatedDrugs);
  }

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
        padding: "1rem",
        paddingTop: "120px",
      }}
    >
      <TopNavBar name="Schedule">
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
      </TopNavBar>

      {scheduledDrugs.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <PillBottle size={100} />
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            No drugs scheduled
          </h1>
        </div>
      ) : (
        <div style={{ marginTop: "2rem" }}>
          {scheduledDrugs.map((drug: any) => (
            <DrugCard
              key={drug.id}
              id={drug.id}
              drug={drug}
              handleRemoveFromState={() => handleDelete(drug?.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SeveralDays from "@/features/shared/components/severalDays";
import { Info } from "lucide-react";

const DrugCard = ({ drug, handleRemoveFromState }: any) => {
  const [drugState, setDrugState] = useState({
    ...drug,
  });

  const [removedIds, setRemovedIds] = useState([]);
  const { toast } = useToast();
  console.log(drugState, "drugState");
  const router = useRouter();

  function handleSave() {
    // Save the drug to local storage
    const scheduledDrugs = JSON.parse(
      localStorage.getItem("scheduledDrugs") || "[]"
    );
    const index = scheduledDrugs.findIndex(
      (item: any) => item.id === drugState.id
    );
    if (index !== -1) {
      scheduledDrugs[index] = drugState;
    } else {
      scheduledDrugs.push(drugState);
    }
    localStorage.setItem("scheduledDrugs", JSON.stringify(scheduledDrugs));
    toast({
      title: `${drug.name}  schedule saved`,
      description: "Your schedule has been saved successfully",
      variant: "success",
    });
  }

  function handleDelete() {
    // Delete the drug from local storage
    const scheduledDrugs = JSON.parse(
      localStorage.getItem("scheduledDrugs") || "[]"
    );
    const index = scheduledDrugs.findIndex(
      (item: any) => item.id === drugState.id
    );
    scheduledDrugs.splice(index, 1);
    localStorage.setItem("scheduledDrugs", JSON.stringify(scheduledDrugs));
    toast({
      title: `${drug.name}  schedule deleted`,
      description: "Your schedule has been deleted successfully",
      variant: "destructive",
    });
    handleRemoveFromState();
  }

  return (
    <Card className=" mx-auto my-5 mobilecol   ">
      <CardHeader>
        <div className="mobilecol flex gap-5">
          <img
            src={drug?.image}
            alt={drug?.name}
            className="w-48 h-48  md:w-36 md:h-36 object-cover rounded-lg"
          />
          <div className="flex-1">
            <CardTitle className="mb-3">{drug.name}</CardTitle>
            <div className="flex flex-wrap gap-2 mb-3">
              {drug?.categories?.map(
                (category: string | any, index: number) => (
                  <Badge key={index} variant={getCategoryVariant(category)}>
                    {category}
                  </Badge>
                )
              )}
            </div>
            <CardDescription className="text-base">
              {drug.usage}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-5 w-[100%]">
        <Accordion type="single" collapsible>
          <AccordionItem value="description">
            <AccordionTrigger>
              <div className="flex  items-center gap-2">
                <Info size={18} />
                Description
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="leading-6 text-gray-700 bg-muted p-3 rounded-md">
                {drug.description}
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="usage">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Info size={18} />
                Usage Instructions
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="leading-6 text-gray-700 bg-muted p-3 rounded-md">
                {drug.usageDescription}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <div className="p-5 overflow-y-auto max-w-[100%] pr-2">
        <SeveralDays
          state={drugState}
          setState={setDrugState}
          name="scheduledDays"
        />
      </div>

      <CardFooter className="flex justify-end pt-0">
        <Button variant="destructive" onClick={handleDelete}>
          Delete
          <Trash2 size={24} />
        </Button>
        <Button variant="default" className="ml-4" onClick={handleSave}>
          Save
          <Save size={24} />
        </Button>
      </CardFooter>
    </Card>
  );
};
