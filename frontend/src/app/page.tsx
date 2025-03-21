"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { HOUSES } from "@/lib/utils";

export default function Home() {
  const [formData, setFormData] = useState({
    square_footage: "",
    num_bedrooms: "",
    num_bathrooms: "",
    year_built: "",
    lot_size: "",
    garage_size: "",
    neighborhood_quality: "",
  });

  const [predictedPrice, setPredictedPrice] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setPredictedPrice(null);

    try {
      const formattedData = {
        square_footage: parseFloat(formData.square_footage),
        num_bedrooms: parseInt(formData.num_bedrooms),
        num_bathrooms: parseInt(formData.num_bathrooms),
        year_built: parseInt(formData.year_built),
        lot_size: parseFloat(formData.lot_size),
        garage_size: parseInt(formData.garage_size),
        neighborhood_quality: parseInt(formData.neighborhood_quality),
      };

      const response = await fetch("http://localhost:8000/houses/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) throw new Error("Failed to fetch prediction");

      const data = await response.json();
      setPredictedPrice(data.predicted_price);
      toast.success(
        `Prediction Success! Estimated Price: $${data.predicted_price}`
      );
    } catch (error) {
      toast.error("Error predicting price. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 tracking-tight">
        House Price Predictor
      </h1>


      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger asChild>
          <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg rounded-lg shadow-lg">
            Predict House Price
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800">
              Enter House Details
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handlePredict} className="grid gap-5">
            <Input
              type="number"
              name="square_footage"
              placeholder="Square Footage"
              onChange={handleChange}
              required
            />
            <Input
              type="number"
              name="num_bedrooms"
              placeholder="Number of Bedrooms"
              onChange={handleChange}
              required
            />
            <Input
              type="number"
              name="num_bathrooms"
              placeholder="Number of Bathrooms"
              onChange={handleChange}
              required
            />
            <Input
              type="number"
              name="year_built"
              placeholder="Year Built"
              onChange={handleChange}
              required
            />
            <Input
              type="number"
              name="lot_size"
              placeholder="Lot Size (Acres)"
              onChange={handleChange}
              required
            />
            <Input
              type="number"
              name="garage_size"
              placeholder="Garage Size"
              onChange={handleChange}
              required
            />
            <Input
              type="number"
              name="neighborhood_quality"
              placeholder="Neighborhood Quality (1-10)"
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow-md"
            >
              Predict
            </Button>
          </form>

          
          {predictedPrice && (
            <div className="mt-4 p-4 bg-gray-100 border rounded-lg">
              <p className="text-lg font-semibold text-gray-700">
                Estimated Price:
              </p>
              <p className="text-2xl font-bold text-green-600">
                ${predictedPrice}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mt-10">
        {HOUSES.map((house) => (
          <Card
            key={house.id}
            className="bg-white shadow-lg rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
          >
            <img
              src={house.image}
              alt={house.title}
              className="rounded-t-lg w-full h-56 object-cover"
            />
            <CardContent className="p-5">
              <CardTitle className="text-lg font-semibold text-gray-900">
                {house.title}
              </CardTitle>
              <p className="text-gray-600 mt-1">
                Price Estimate:{" "}
                <span className="text-green-500 font-bold">
                  ${house.price.toLocaleString()}
                </span>
              </p>
              <p className="text-gray-500 text-sm">
                Location: {house.location}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
