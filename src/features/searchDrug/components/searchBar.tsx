import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Brain, ShoppingCart, Pill } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
// Category to variant mapping
export const getCategoryVariant = (
  category: string
): "default" | "destructive" | "warning" | "info" | "success" => {
  const categoryLower = category.toLowerCase();

  if (
    categoryLower.includes("pain") ||
    categoryLower.includes("killer") ||
    categoryLower.includes("opioid")
  ) {
    return "destructive";
  }
  if (
    categoryLower.includes("antibiotic") ||
    categoryLower.includes("infection")
  ) {
    return "success";
  }
  if (
    categoryLower.includes("blood") ||
    categoryLower.includes("heart") ||
    categoryLower.includes("pressure")
  ) {
    return "info";
  }
  if (
    categoryLower.includes("allergy") ||
    categoryLower.includes("fever") ||
    categoryLower.includes("inflammation")
  ) {
    return "warning";
  }
  return "default";
};

type Drug = {
  id: number;
  name: string;
  categories: string[];
  usage: string;
  image: string;
};

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Drug[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const abortControllerRef = useRef<AbortController | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const fetchData = async () => {
      if (query.trim() === "") {
        setResults([]);
        return;
      }

      setLoading(true);
      setError("");

      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Enhanced search functionality
        const searchTerm = query.toLowerCase();
        const filteredResults = mockDrugs.filter(
          (drug) =>
            drug.name.toLowerCase().includes(searchTerm) ||
            drug.nameArabic.toLowerCase().includes(searchTerm) ||
            drug.categories.some((category) =>
              category.toLowerCase().includes(searchTerm)
            )
        );

        setResults(filteredResults);
      } catch (error: any) {
        setError("Failed to search drugs");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [query]);

  const handleSchedule = (drugId: number) => {
    const drug = mockDrugs.find((d) => d.id === drugId);
    if (!drug) return;

    const storedDrugs = JSON.parse(
      localStorage.getItem("scheduledDrugs") || "[]"
    );
    const isAlreadyScheduled = storedDrugs.some((d: Drug) => d.id === drugId);

    if (isAlreadyScheduled) {
      // Show a toast notification (assuming you have a toast mechanism in place)
      console.log("Drug is already scheduled");
      toast({
        title: `Already Scheduled: ${drug.name}`,
        description: "The drug is already in your schedule.",
        variant: "warning",
        action: (
          <ToastAction
            altText="Go to schedule"
            onClick={() => router.push("/schedule")}
          >
            View Schedule
          </ToastAction>
        ),
      });
    } else {
      storedDrugs.push(drug);
      localStorage.setItem("scheduledDrugs", JSON.stringify(storedDrugs));
      // Show a toast notification (assuming you have a toast mechanism in place)
      console.log("Drug scheduled successfully");
      toast({
        title: `Scheduled: ${drug.name}`,
        description: "The drug has been added to your schedule.",
        variant: "success",
        action: (
          <ToastAction
            altText="Go to schedule"
            onClick={() => router.push("/schedule")}
          >
            View Schedule
          </ToastAction>
        ),
      });
    }
  };

  const handleAskAI = (drugId: number) => {
    console.log(`Asking AI about drug ${drugId}`);
    router.push(`https://healthyhousehub.netlify.app`);
  };

  const handleOrder = (drugId: number) => {
    // add the drug to the cart in the localStorage
    console.log(`Ordering drug ${drugId}`);
    const drug = mockDrugs.find((d) => d.id === drugId);
    if (!drug) return;
    const storedDrugs = JSON.parse(localStorage.getItem("cartDrugs") || "[]");
    const isAlreadyInCart = storedDrugs.some((d: Drug) => d.id === drugId);
    if (isAlreadyInCart) {
      // Show a toast notification (assuming you have a toast mechanism in place)
      console.log("Drug is already in cart");
      toast({
        title: `Already in Cart: ${drug.name}`,
        description: "The drug is already in your cart.",
        variant: "warning",
        action: (
          <ToastAction
            altText="Go to cart"
            onClick={() => router.push("/order")}
          >
            View Cart
          </ToastAction>
        ),
      });
    } else {
      storedDrugs.push(drug);
      localStorage.setItem("cartDrugs", JSON.stringify(storedDrugs));
      // Show a toast notification (assuming you have a toast mechanism in place)
      console.log("Drug added to cart successfully");
      toast({
        title: `Added to Cart: ${drug.name}`,
        description: "The drug has been added to your cart.",
        variant: "success",
        action: (
          <ToastAction
            altText="Go to cart"
            onClick={() => router.push("/order")}
          >
            View Cart
          </ToastAction>
        ),
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl mx-auto p-4 space-y-4  rounded-lg">
        <div
          className=""
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "0.5rem",
          }}
        >
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="drug name"
            style={{
              borderRadius: "0.5rem",
              borderWidth: "2px",
              borderColor: "#E5E7EB",
              padding: "0.75rem",
              width: "100%",
              fontSize: "1rem",
              marginBottom: "0.5rem",
            }}
          />
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Button
              variant="default"
              className="h-10"
              onClick={() => router.push("/schedule")}
            >
              <Calendar className="w-4 h-4 mr-1" />
              Calendar
            </Button>
            <Button
              variant="warning"
              className="h-10"
              onClick={() => router.push("/order")}
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              Cart
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div
          className="grid gap-4 max-h-[100%] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          style={{
            maxHeight: "100%",
            overflowY: "auto",
            paddingRight: "0.5rem",
            scrollbarWidth: "thin",
          }}
        >
          {loading
            ? [1, 2].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="pb-2">
                    <Skeleton className="h-6 w-1/3" /> {/* Title */}
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      <Skeleton className="w-24 h-24 rounded-lg" />{" "}
                      {/* Image */}
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" /> {/* Usage text */}
                        <div className="flex flex-wrap gap-1">
                          {" "}
                          {/* Categories */}
                          <Skeleton className="h-5 w-16 rounded-full" />
                          <Skeleton className="h-5 w-20 rounded-full" />
                          <Skeleton className="h-5 w-24 rounded-full" />
                        </div>
                        <div className="flex gap-2 pt-2">
                          {" "}
                          {/* Buttons */}
                          <Skeleton className="h-8 w-24 rounded" />
                          <Skeleton className="h-8 w-24 rounded" />
                          <Skeleton className="h-8 w-24 rounded" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            : results.map((drug) => (
                <Card
                  key={drug.id}
                  className="relative border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-gray-800">
                      {drug.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4 mobilecol">
                      <img
                        src={drug.image}
                        alt={drug.name}
                        className="w-24 h-24 object-cover rounded-lg"
                        style={{
                          aspectRatio: "1/1",
                          width: "8rem",
                          height: "8rem",
                          objectFit: "cover",
                          borderRadius: "0.5rem",
                        }}
                      />
                      <div className="flex-1 space-y-2">
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {drug.usage}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {drug.categories.map((category, index) => (
                            <Badge
                              key={index}
                              variant={getCategoryVariant(category)}
                              className="text-xs"
                            >
                              {category}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2 pt-2 flex-wrap">
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleSchedule(drug.id)}
                            className="h-8 flex items-center"
                          >
                            <Calendar className="w-4 h-4 mr-1" />
                            <span className="text-xs">schedule Drug</span>
                          </Button>
                          <Link href={`https://healthyhousehub.netlify.app`}>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => handleAskAI(drug.id)}
                              className="h-8 flex items-center"
                            >
                              <Brain className="w-4 h-4 mr-1" />
                              <span className="text-xs">Ask AI</span>
                            </Button>
                          </Link>
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => handleOrder(drug.id)}
                            className="h-8 flex items-center"
                          >
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            <span className="text-xs">add to Cart</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

          {!loading && query && results.length === 0 && (
            <Card>
              <CardContent className="p-4">
                <p className="text-center text-gray-500">
                  No drugs found matching your search.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
        {!query && (
          <div className="flex flex-col h-[80vh] items-center justify-center py-8">
            <Pill
              className="w-24 h-24 text-indigo-500 mb-2 animate-pulse "
              style={{
                color: "#6366F1",
                width: "6rem",
                height: "6rem",
              }}
            />
            <p className="text-gray-500 text-lg">
              Search for a drug to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export const mockDrugs = [
  {
    id: 1,
    name: "Aspirin",
    nameArabic: "أسبرين",
    categories: [
      "pain killer",
      "fever reducer",
      "anti-inflammatory",
      "NSAID",
      "heart attack prevention",
    ],
    usage: "Pain relief, fever reduction, and prevention of heart attacks",
    description:
      "Aspirin is a nonsteroidal anti-inflammatory drug (NSAID) used to reduce pain, fever, and inflammation. It is also commonly used as an antiplatelet medication to prevent heart attacks and strokes.",
    usageDescription:
      "Aspirin is taken orally, typically in tablet form. It should be used with caution in people with bleeding disorders or stomach ulcers. It is often taken with food to reduce stomach irritation.",
    image:
      "https://i5.walmartimages.com/asr/f9350215-da49-4125-b812-0a2aac22a32b_1.68b4b6554328cba045c6babcdeafeee9.jpeg",
  },
  {
    id: 2,
    name: "Ibuprofen",
    nameArabic: "إيبوبروفين",
    categories: [
      "pain killer",
      "anti-inflammatory",
      "NSAID",
      "fever reducer",
      "headache",
    ],
    usage: "Pain relief, inflammation reduction, and fever treatment",
    description:
      "Ibuprofen is an NSAID that helps reduce inflammation, pain, and fever. It is commonly used for headaches, muscle pain, arthritis, and menstrual cramps.",
    usageDescription:
      "Ibuprofen should be taken with food or milk to prevent stomach upset. The dosage depends on the severity of pain or inflammation, and it should not be used for prolonged periods without medical supervision.",
    image: "https://images.heb.com/is/image/HEBGrocery/002045366-1",
  },
  {
    id: 3,
    name: "Paracetamol",
    nameArabic: "باراسيتامول",
    categories: ["pain killer", "fever reducer"],
    usage: "Pain relief and fever reduction",
    description:
      "Paracetamol, also known as acetaminophen, is a pain reliever and fever reducer. It is commonly used for mild to moderate pain and is considered safer for people with stomach issues compared to NSAIDs.",
    usageDescription:
      "Paracetamol should be taken orally with water. It can be used for fever or mild pain but should not exceed the recommended dosage, as overdosing can cause liver damage.",
    image:
      "https://www.chemist-4-u.com/media/catalog/product/p/a/paracetamol_tablets_500mg.jpg",
  },
  {
    id: 4,
    name: "Amoxicillin",
    nameArabic: "أموكسيسيلين",
    categories: ["antibiotic", "bacterial infection"],
    usage: "Bacterial infections treatment",
    description:
      "Amoxicillin is a widely used antibiotic in the penicillin family. It is effective against various bacterial infections, including respiratory tract infections, ear infections, and urinary tract infections.",
    usageDescription:
      "Amoxicillin is taken orally, usually every 8 to 12 hours. It should be completed as prescribed to avoid antibiotic resistance. It can be taken with or without food.",
    image:
      "https://th.bing.com/th/id/R.de187ca91c876b288d47aa9853ea9fc2?rik=%2bg9guP%2fciuqfJg&pid=ImgRaw&r=0",
  },
  {
    id: 5,
    name: "Ciprofloxacin",
    nameArabic: "سيبروفلوكساسين",
    categories: ["antibiotic", "bacterial infection"],
    usage: "Bacterial infections treatment",
    description:
      "Ciprofloxacin is a fluoroquinolone antibiotic used to treat serious bacterial infections such as urinary tract infections, respiratory infections, and certain types of gastroenteritis.",
    usageDescription:
      "Ciprofloxacin should be taken with plenty of water and should not be taken with dairy products. It is important to complete the full course of treatment even if symptoms improve early.",
    image:
      "https://th.bing.com/th/id/OIP.dPGGVzYbWTs_tm5pdmT5VAHaFQ?w=970&h=688&rs=1&pid=ImgDetMain",
  },
  {
    id: 6,
    name: "Metformin",
    nameArabic: "ميتفورمين",
    categories: ["diabetes", "blood sugar control"],
    usage: "Type 2 diabetes management",
    description:
      "Metformin is an oral medication used to help control blood sugar levels in people with type 2 diabetes. It works by reducing glucose production in the liver and improving insulin sensitivity.",
    usageDescription:
      "Metformin should be taken with food to minimize stomach upset. It is usually prescribed as part of a comprehensive diabetes management plan that includes diet and exercise.",
    image:
      "https://www.mcguffmedical.com/content/images/thumbs/0013873_metformin-500mg-100-tabletsbottle.jpeg",
  },
  {
    id: 7,
    name: "Atorvastatin",
    nameArabic: "أتورفاستاتين",
    categories: ["cholesterol", "heart disease prevention"],
    usage: "Cholesterol reduction",
    description:
      "Atorvastatin is a statin medication used to lower cholesterol levels and reduce the risk of heart disease and stroke. It works by inhibiting an enzyme responsible for cholesterol production in the liver.",
    usageDescription:
      "Atorvastatin should be taken once daily, usually in the evening. It is most effective when combined with a healthy diet and regular exercise.",
    image:
      "https://cdn01.pharmeasy.in/dam/products/J21424/atorvastatin-10-mg-tablet-10-medlife-pure-generics-combo-3-1626532296.jpg",
  },
  {
    id: 8,
    name: "Omeprazole",
    nameArabic: "أوميبرازول",
    categories: ["acid reflux", "stomach ulcer", "PPI"],
    usage: "Acid reflux and stomach ulcers treatment",
    description:
      "Omeprazole is a proton pump inhibitor (PPI) that reduces stomach acid production. It is used to treat acid reflux, gastroesophageal reflux disease (GERD), and stomach ulcers.",
    usageDescription:
      "Omeprazole should be taken before meals, usually in the morning. It may take a few days to feel the full effect, and long-term use should be monitored by a healthcare professional.",
    image:
      "https://th.bing.com/th/id/R.207a0df86eb7995912231dbb62521c23?rik=720ntNVAETsZrg&pid=ImgRaw&r=0",
  },
  {
    id: 9,
    name: "Losartan",
    nameArabic: "لوسارتان",
    categories: ["blood pressure", "hypertension", "ARB"],
    usage: "High blood pressure treatment",
    description:
      "Losartan is an angiotensin II receptor blocker (ARB) used to treat high blood pressure (hypertension) and protect the kidneys in people with diabetes.",
    usageDescription:
      "Losartan is usually taken once daily with or without food. It helps lower blood pressure gradually and should not be stopped abruptly without consulting a doctor.",
    image:
      "https://th.bing.com/th/id/OIP.86RfTSCAqtGijGRLRLaHHAHaFF?w=1772&h=1215&rs=1&pid=ImgDetMain",
  },
  {
    id: 10,
    name: "Loratadine",
    nameArabic: "لوراتادين",
    categories: ["allergy", "antihistamine"],
    usage: "Allergy symptom relief",
    description:
      "Loratadine is an antihistamine used to relieve allergy symptoms such as sneezing, runny nose, and itchy eyes. It is commonly used for hay fever and hives.",
    usageDescription:
      "Loratadine is taken once daily, with or without food. It does not usually cause drowsiness, making it a preferred choice for daytime allergy relief.",
    image:
      "https://2.bp.blogspot.com/-3SgiTl348pE/VXVUPejlUnI/AAAAAAAABdk/4ulDnecxBmA/s1600/Terry-White-Chemists-Loratadine-50-tablets.jpg",
  },
  {
    id: 11,
    name: "Cetirizine",
    nameArabic: "سيتيريزين",
    categories: ["allergy", "antihistamine"],
    usage: "Allergy symptom relief",
    description:
      "Cetirizine is an antihistamine used to treat hay fever, seasonal allergies, and hives. It helps relieve sneezing, runny nose, and itching.",
    usageDescription:
      "Cetirizine is taken once daily, with or without food. It may cause mild drowsiness in some people, so caution is advised when driving or operating machinery.",
    image:
      "https://i5.walmartimages.com/asr/3fb13470-479c-4d24-9643-fa0d94b8db4a_1.ae236f757f2d3e770f09f71d84e54097.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff",
  },
  {
    id: 12,
    name: "Prednisone",
    nameArabic: "بريدنيزون",
    categories: ["corticosteroid", "inflammation", "autoimmune"],
    usage: "Inflammation and autoimmune disease treatment",
    description:
      "Prednisone is a corticosteroid used to reduce inflammation in conditions like asthma, arthritis, and autoimmune disorders.",
    usageDescription:
      "Prednisone should be taken with food to prevent stomach irritation. It is usually prescribed in gradually decreasing doses to avoid withdrawal effects.",
    image:
      "https://th.bing.com/th/id/OIP.YTneiP4ssIkaazt7NxmsSQHaHa?w=1200&h=1200&rs=1&pid=ImgDetMain",
  },
  {
    id: 13,
    name: "Gabapentin",
    nameArabic: "جابابنتين",
    categories: ["nerve pain", "epilepsy", "anticonvulsant"],
    usage: "Nerve pain and epilepsy treatment",
    description:
      "Gabapentin is an anticonvulsant medication used to treat nerve pain and epilepsy. It helps reduce seizures and pain from nerve damage.",
    usageDescription:
      "Gabapentin should be taken as prescribed, usually three times a day. It should not be stopped suddenly, as withdrawal symptoms may occur.",
    image:
      "https://th.bing.com/th/id/OIP.2EyfHM6mLbKucunxrzSPVQHaGH?w=750&h=619&rs=1&pid=ImgDetMain",
  },
  {
    id: 14,
    name: "Tramadol",
    nameArabic: "ترامادول",
    categories: ["pain relief", "opioid"],
    usage: "Moderate to severe pain relief",
    description:
      "Tramadol is an opioid pain reliever used to treat moderate to severe pain. It works by altering the way the brain perceives pain.",
    usageDescription:
      "Tramadol should be taken exactly as prescribed. Overuse can lead to dependence or addiction. It should not be combined with alcohol or other depressants.",
    image:
      "https://img1.exportersindia.com/product_images/bc-full/dir_168/5021033/tramadol-1496849103-3045369.jpeg",
  },
  {
    id: 15,
    name: "Doxycycline",
    nameArabic: "دوكسيسيكلين",
    categories: ["antibiotic", "bacterial infection"],
    usage: "Bacterial infection treatment",
    description:
      "Doxycycline is a broad-spectrum antibiotic used to treat bacterial infections, including respiratory infections, acne, and sexually transmitted infections.",
    usageDescription:
      "Doxycycline should be taken with a full glass of water and should not be taken with dairy products or antacids. Sun exposure should be minimized while taking this medication.",
    image: "https://www.baymed.co.uk/wp-content/uploads/2016/08/DOXY001.jpg",
  },
  {
    id: 16,
    name: "Furosemide",
    nameArabic: "فوروسيميد",
    categories: ["diuretic", "fluid retention", "blood pressure"],
    usage: "Fluid retention and high blood pressure treatment",
    description:
      "Furosemide is a diuretic (water pill) used to treat fluid retention (edema) and high blood pressure by helping the body remove excess salt and water.",
    usageDescription:
      "Furosemide should be taken in the morning to prevent nighttime urination. It may cause dehydration or electrolyte imbalances, so fluid intake should be monitored.",
    image:
      "https://th.bing.com/th/id/OIP.bTszkizp7RVcXCzE5xj_fAHaHa?w=1024&h=1024&rs=1&pid=ImgDetMain",
  },
  {
    id: 17,
    name: "Warfarin",
    nameArabic: "وارفارين",
    categories: ["anticoagulant", "blood thinner", "clot prevention"],
    usage: "Blood clot prevention",
    description:
      "Warfarin is an anticoagulant (blood thinner) used to prevent blood clots, reducing the risk of strokes and deep vein thrombosis (DVT).",
    usageDescription:
      "Warfarin requires regular blood tests to monitor its effect. It should not be combined with certain foods high in vitamin K, such as leafy greens.",
    image: "https://c8.alamy.com/comp/C0A8CY/warfarin-C0A8CY.jpg",
  },
  {
    id: 18,
    name: "Clopidogrel",
    nameArabic: "كلوبيدوجريل",
    categories: ["antiplatelet", "clot prevention", "heart attack prevention"],
    usage: "Blood clot prevention",
    description:
      "Clopidogrel is an antiplatelet medication used to prevent heart attacks and strokes in people with cardiovascular disease.",
    usageDescription:
      "Clopidogrel is taken once daily, with or without food. It should not be stopped abruptly without consulting a doctor, as it may increase the risk of clot formation.",
    image:
      "https://c8.alamy.com/comp/CR1EJ8/a-packet-of-clopidogrel-anticoagulant-drugs-showing-tablet-also-known-CR1EJ8.jpg",
  },
  {
    id: 19,
    name: "Insulin",
    nameArabic: "الأنسولين",
    categories: ["diabetes", "blood sugar control"],
    usage: "Blood sugar regulation in diabetes",
    description:
      "Insulin is a hormone that helps regulate blood sugar levels in people with diabetes. It is available in different types, including rapid-acting, intermediate-acting, and long-acting forms.",
    usageDescription:
      "Insulin is injected under the skin before meals or as prescribed. Dosage is based on blood sugar levels, diet, and physical activity.",
    image:
      "https://th.bing.com/th/id/OIP.SLmIQmOP5pIHaPy6ssNfigHaFj?w=800&h=600&rs=1&pid=ImgDetMain",
  },
  {
    id: 20,
    name: "Levothyroxine",
    nameArabic: "ليفوثيروكسين",
    categories: ["thyroid", "hormone replacement"],
    usage: "Thyroid hormone replacement",
    description:
      "Levothyroxine is a synthetic thyroid hormone used to treat hypothyroidism, a condition where the thyroid does not produce enough hormones.",
    usageDescription:
      "Levothyroxine should be taken on an empty stomach, preferably in the morning, at least 30 minutes before eating. Consistency in timing is important for effectiveness.",
    image:
      "https://th.bing.com/th/id/OIP.sOVvpMLZGEhyWYGM-e8VHwHaE7?w=900&h=599&rs=1&pid=ImgDetMain",
  },
  {
    id: 21,
    name: "Metformin",
    nameArabic: "ميتفورمين",
    categories: ["diabetes", "blood sugar control"],
    usage: "Blood sugar regulation in type 2 diabetes",
    description:
      "Metformin is an oral diabetes medication that helps control blood sugar levels, mainly by decreasing glucose production in the liver.",
    usageDescription:
      "Metformin is taken with meals to reduce stomach discomfort. Dosage is adjusted based on blood sugar response.",
    image:
      "https://th.bing.com/th/id/OIP.x1zLsryeIAQFEM7v7KuwDAHaEK?w=1920&h=1080&rs=1&pid=ImgDetMain",
  },
  {
    id: 22,
    name: "Amlodipine",
    nameArabic: "أملوديبين",
    categories: ["hypertension", "heart disease"],
    usage: "Blood pressure and angina control",
    description:
      "Amlodipine is a calcium channel blocker that helps relax blood vessels, improving blood flow and lowering blood pressure.",
    usageDescription:
      "Amlodipine is taken once daily, with or without food. It should be taken at the same time each day for best results.",
    image:
      "https://th.bing.com/th/id/OIP.rXQtqZmfZ1cWJQqDBs-VQAHaE8?w=900&h=600&rs=1&pid=ImgDetMain",
  },
  {
    id: 23,
    name: "Atorvastatin",
    nameArabic: "أتورفاستاتين",
    categories: ["cholesterol", "heart disease"],
    usage: "Cholesterol and triglyceride reduction",
    description:
      "Atorvastatin is a statin medication that lowers bad cholesterol (LDL) and increases good cholesterol (HDL), reducing heart disease risk.",
    usageDescription:
      "Taken once daily, usually in the evening. A low-fat diet and regular exercise enhance its effectiveness.",
    image: "https://c8.alamy.com/comp/DF9JF3/atorvastatin-tablets-DF9JF3.jpg",
  },
  {
    id: 24,
    name: "Omeprazole",
    nameArabic: "أوميبرازول",
    categories: ["acid reflux", "ulcers"],
    usage: "Acid reduction in stomach disorders",
    description:
      "Omeprazole is a proton pump inhibitor (PPI) that reduces stomach acid, helping treat GERD, ulcers, and heartburn.",
    usageDescription:
      "Taken before meals, typically once daily. It should not be crushed or chewed.",
    image:
      "https://th.bing.com/th/id/OIP.cRtDfhK8GvD3I2jH2h2_wAHaEo?w=900&h=562&rs=1&pid=ImgDetMain",
  },
  {
    id: 25,
    name: "Losartan",
    nameArabic: "لوسارتان",
    categories: ["hypertension", "kidney protection"],
    usage: "Blood pressure and kidney protection",
    description:
      "Losartan is an angiotensin receptor blocker (ARB) that helps lower blood pressure and protects kidneys in diabetic patients.",
    usageDescription:
      "Losartan is taken once daily, with or without food. It may take several weeks for full benefits to appear.",
    image:
      "https://th.bing.com/th/id/OIP.9efHksyfq5yTLcs3JS49RgHaEc?w=1024&h=606&rs=1&pid=ImgDetMain",
  },
  {
    id: 26,
    name: "Salbutamol",
    nameArabic: "سالبيوتامول",
    categories: ["asthma", "bronchodilator"],
    usage: "Relief of asthma and breathing difficulties",
    description:
      "Salbutamol is a fast-acting bronchodilator used to treat wheezing and shortness of breath in asthma and COPD.",
    usageDescription:
      "Used as an inhaler or nebulizer as needed for quick relief. Overuse can reduce effectiveness.",
    image:
      "https://th.bing.com/th/id/OIP.3uIQa7v7CDAkPepRRl0ljwHaE7?w=1280&h=853&rs=1&pid=ImgDetMain",
  },
  {
    id: 27,
    name: "Amoxicillin",
    nameArabic: "أموكسيسيلين",
    categories: ["antibiotic", "bacterial infection"],
    usage: "Treatment of bacterial infections",
    description:
      "Amoxicillin is a penicillin-type antibiotic used to treat respiratory, urinary tract, and skin infections.",
    usageDescription:
      "Taken every 8-12 hours with food to avoid stomach upset. Complete the full course to prevent resistance.",
    image:
      "https://th.bing.com/th/id/OIP.6_rvjEfMJ3HPPsWz3_a2dwHaFi?w=1024&h=768&rs=1&pid=ImgDetMain",
  },
  {
    id: 28,
    name: "Ciprofloxacin",
    nameArabic: "سيبروفلوكساسين",
    categories: ["antibiotic", "bacterial infection"],
    usage: "Broad-spectrum antibiotic for infections",
    description:
      "Ciprofloxacin is a fluoroquinolone antibiotic effective against various bacterial infections, including UTIs and respiratory infections.",
    usageDescription:
      "Should be taken with a full glass of water, avoiding dairy products and antacids. Complete the course as prescribed.",
    image:
      "https://th.bing.com/th/id/OIP.xgAhqR07Up8QwvDE0X-x6AHaFj?w=800&h=600&rs=1&pid=ImgDetMain",
  },
  {
    id: 29,
    name: "Warfarin",
    nameArabic: "وارفارين",
    categories: ["anticoagulant", "blood thinner"],
    usage: "Prevention of blood clots",
    description:
      "Warfarin is a blood thinner used to prevent strokes, heart attacks, and clot-related conditions.",
    usageDescription:
      "Requires regular blood monitoring to adjust dosage. Avoid sudden changes in vitamin K intake.",
    image:
      "https://th.bing.com/th/id/OIP.sOQ3M55rtwO6z8eAJsox-QHaFj?w=900&h=675&rs=1&pid=ImgDetMain",
  },
  {
    id: 30,
    name: "Clopidogrel",
    nameArabic: "كلوبيدوجريل",
    categories: ["antiplatelet", "heart disease"],
    usage: "Prevention of heart attacks and strokes",
    description:
      "Clopidogrel prevents platelets from sticking together, reducing the risk of blood clots in heart disease and stroke patients.",
    usageDescription:
      "Taken once daily with or without food. Consistency in timing is essential for effectiveness.",
    image:
      "https://th.bing.com/th/id/OIP.EEbL8Kbl2GfiCKHzDGBrgAHaFD?w=1300&h=887&rs=1&pid=ImgDetMain",
  },
  {
    id: 31,
    name: "Panadol",
    nameArabic: "بنادول",
    categories: ["pain reliever", "fever reducer"],
    usage: "Relieves mild to moderate pain and fever",
    description:
      "Panadol contains paracetamol, which is used to treat headaches, muscle aches, arthritis, backaches, toothaches, colds, and fevers.",
    usageDescription:
      "Take with water every 4-6 hours as needed. Do not exceed the recommended dose to avoid liver damage.",
    image:
      "https://th.bing.com/th/id/OIP.47JJkP2jXRl7paPt1tY2mQHaHa?w=2000&h=2000&rs=1&pid=ImgDetMain",
  },
];
