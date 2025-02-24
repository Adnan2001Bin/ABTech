import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Package, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="relative h-[300px] w-full overflow-hidden rounded-lg mb-8">
        <img
          src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="About Us"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">About Us</h1>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Our Mission
        </h2>
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
          At <span className="font-semibold text-primary">AB-TECH</span>, we’re
          dedicated to bringing you the best products with unbeatable convenience.
          Our goal is to make shopping a seamless, enjoyable experience, whether
          you’re looking for daily essentials or special treats.
        </p>
      </section>

      {/* Values Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-semibold">
              <Truck className="w-6 h-6 text-primary" /> Fast Delivery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              We ensure your orders reach you quickly and safely, wherever you are.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-semibold">
              <Package className="w-6 h-6 text-primary" /> Quality Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Every item is carefully selected to meet high standards of quality.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-semibold">
              <Heart className="w-6 h-6 text-primary" /> Customer Love
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Your satisfaction is our priority—we’re here for you every step of the way.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Ready to Shop?
        </h3>
        <Button
          onClick={() => navigate("/collections")}
          className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg"
        >
          Explore Our Collections
        </Button>
      </section>
    </div>
  );
};

export default About;