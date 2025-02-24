import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thank you for your message! We’ll get back to you soon.", {
      position: "top-center",
      autoClose: 2000,
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="container mx-auto py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <section className="mb-8 sm:mb-12 lg:mb-16 text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800 mb-3 sm:mb-4">
          Contact Us
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
          Have questions or need assistance? Reach out to us—we’re here to help!
        </p>
      </section>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Contact Form */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl lg:text-2xl font-semibold">
              Send Us a Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs sm:text-sm">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  required
                  className="text-xs sm:text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs sm:text-sm">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Your Email"
                  required
                  className="text-xs sm:text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-xs sm:text-sm">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your Message"
                  rows={4}
                  required
                  className="text-xs sm:text-sm"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white py-2 sm:py-3 text-sm sm:text-base transition-transform duration-300 hover:scale-105"
              >
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl lg:text-2xl font-semibold">
              Get in Touch
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <div>
                <p className="font-semibold text-gray-800 text-xs sm:text-sm">Email</p>
                <p className="text-gray-600 text-xs sm:text-sm">support@yourshop.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <div>
                <p className="font-semibold text-gray-800 text-xs sm:text-sm">Phone</p>
                <p className="text-gray-600 text-xs sm:text-sm">+880 123 456 7890</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <div>
                <p className="font-semibold text-gray-800 text-xs sm:text-sm">Address</p>
                <p className="text-gray-600 text-xs sm:text-sm">
                  123 Shopping Lane, Dhaka, Bangladesh
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;