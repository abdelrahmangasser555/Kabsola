"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  Phone,
  Mail,
  Link as LinkIcon,
  AlertCircle,
  PlusCircle,
  MinusCircle,
  Pill,
  Home,
  ChartBar,
  BotMessageSquare,
  ShoppingCart,
} from "lucide-react";
import MapEmbed from "@/features/shared/components/googleMapsLocation";
import Link from "next/link";

// Profile Form Component
const ProfileForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      email: "",
      phone: "",
      locationLink: "",
      emergencyContact: "",
      bloodType: "",
      medicines: [],
      prevConditions: "",
      imageUrl: "",
    }
  );
  const [newMedicine, setNewMedicine] = useState("");

  const handleAddMedicine = () => {
    if (newMedicine.trim()) {
      setFormData((prev) => ({
        ...prev,
        medicines: [...(prev?.medicines || []), newMedicine.trim()],
      }));
      setNewMedicine("");
    }
  };

  const handleRemoveMedicine = (index) => {
    setFormData((prev) => ({
      ...prev,
      medicines: prev?.medicines?.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="imageUrl">Profile Image URL</Label>
        <Input
          id="imageUrl"
          value={formData.imageUrl}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))
          }
          placeholder="Enter image URL"
        />
        {
          // Display the image preview if the URL is valid
          formData.imageUrl && (
            <div className="flex justify-center">
              <img
                src={formData.imageUrl}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-xl mt-2"
              />
            </div>
          )
        }
      </div>

      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          required
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          required
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, phone: e.target.value }))
          }
          required
        />
      </div>

      <div>
        <Label htmlFor="locationLink">Location Link</Label>
        <Input
          id="locationLink"
          value={formData.locationLink}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, locationLink: e.target.value }))
          }
          required
        />
      </div>

      <div>
        <Label htmlFor="emergencyContact">Emergency Contact</Label>
        <Input
          id="emergencyContact"
          value={formData.emergencyContact}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              emergencyContact: e.target.value,
            }))
          }
          required
        />
      </div>

      <div>
        <Label htmlFor="bloodType">Blood Type</Label>
        <Input
          id="bloodType"
          value={formData.bloodType}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, bloodType: e.target.value }))
          }
          required
        />
      </div>

      <div>
        <Label>Medicines</Label>
        <div className="flex gap-2 mb-2">
          <Input
            value={newMedicine}
            onChange={(e) => setNewMedicine(e.target.value)}
            placeholder="Add medicine"
            onKeyDown={(e) => e.key === "Enter" && handleAddMedicine()}
          />
          <Button type="button" onClick={handleAddMedicine}>
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          {formData.medicines?.map((medicine, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-secondary p-2 rounded"
            >
              <span>{medicine}</span>
              <Button
                type="button"
                variant="ghost"
                onClick={() => handleRemoveMedicine(index)}
              >
                <MinusCircle className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="prevConditions">Previous Conditions</Label>
        <textarea
          id="prevConditions"
          value={formData.prevConditions}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, prevConditions: e.target.value }))
          }
          className="w-full p-2 border rounded"
        />
      </div>

      <Button type="submit" className="w-full">
        Save Profile
      </Button>
    </form>
  );
};

// Profile Display Component
const ProfileDisplay = ({ data }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <img
          src={data?.imageUrl || "/api/placeholder/150/150"}
          alt="Profile"
          className="rounded-xl w-52 h-52 object-cover"
        />
      </div>

      <div className="space-y-2">
        {data.name && (
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="font-semibold">{data.name}</span>
          </div>
        )}

        {data.email && (
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>{data.email}</span>
          </div>
        )}

        {data.phone && (
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>{data.phone}</span>
          </div>
        )}

        {data.locationLink && (
          <div className="flex items-center gap-2">
            <LinkIcon className="h-4 w-4" />
            <span>Location Map</span>
          </div>
        )}

        {data.locationLink && <MapEmbed mapLink={data.locationLink} />}

        {data.emergencyContact && (
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span>Emergency Contact: {data.emergencyContact}</span>
          </div>
        )}

        {data.bloodType && (
          <div>
            <h4 className="font-semibold mb-1">Blood Type</h4>
            <span>{data.bloodType}</span>
          </div>
        )}

        {data.medicines?.length > 0 && (
          <div>
            <h4 className="font-semibold mb-1">Current Medicines</h4>
            <ul className="list-disc pl-5">
              {data.medicines.map((medicine, index) => (
                <li key={index}>{medicine}</li>
              ))}
            </ul>
          </div>
        )}

        {data.prevConditions && (
          <div>
            <h4 className="font-semibold mb-1">Previous Conditions</h4>
            <p>{data.prevConditions}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Profile Component
const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    } else {
      setIsFormOpen(true);
    }
  }, []);

  const handleSubmit = (data) => {
    localStorage.setItem("userProfile", JSON.stringify(data));
    setProfileData(data);
    setIsFormOpen(false);
  };

  return (
    <Card className="w-full h-[100%] max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <div className="flex flex-wrap gap-2">
          <Link href="/">
            <Button variant="success">
              Home
              <Home className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="https://healthyhousehub.netlify.app">
            <Button variant="default">
              Chat with Doctor
              <BotMessageSquare className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/order">
            <Button variant="warning">
              Order Medicines
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/search">
            <Button variant="destructive">
              Search Medicines
              <Pill className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/schedule">
            <Button variant="default">
              Schedule Medicines
              <ChartBar className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {profileData ? (
          <>
            <ProfileDisplay data={profileData} />
            <div className="mt-4">
              <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogTrigger asChild>
                  <Button className="w-[100%]">Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[100vh] h-[100%] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Edit Profile Information</DialogTitle>
                  </DialogHeader>
                  <ProfileForm
                    onSubmit={handleSubmit}
                    initialData={profileData}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </>
        ) : (
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Enter Profile Information</DialogTitle>
              </DialogHeader>
              <ProfileForm onSubmit={handleSubmit} />
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};

export default Profile;
