import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { InsertContactMessage } from "@shared/schema";

export default function ContactSection() {
  const { toast } = useToast();
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      setShowSuccess(true);
      form.reset();
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    },
    onError: (error: any) => {
      console.error("Contact form error:", error);
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact me directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Get In <span className="text-accent-primary">Touch</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-accent-primary">Let's Connect</h3>
              <p className="text-white-300 text-lg leading-relaxed mb-8">
                I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology. Feel free to reach out!
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent-primary/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-envelope text-accent-primary text-xl"></i>
                  </div>
                  <div>
                    <p className="text-white-400 text-sm">Email</p>
                    <p className="text-white-200">alex.chen@email.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent-primary/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-phone text-accent-primary text-xl"></i>
                  </div>
                  <div>
                    <p className="text-white-400 text-sm">Phone</p>
                    <p className="text-white-200">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent-primary/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-map-marker-alt text-accent-primary text-xl"></i>
                  </div>
                  <div>
                    <p className="text-white-400 text-sm">Location</p>
                    <p className="text-white-200">San Francisco, CA</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <a
                  href="#"
                  className="w-12 h-12 bg-black-700 hover:bg-accent-primary rounded-lg flex items-center justify-center transition-colors duration-300"
                >
                  <i className="fab fa-github text-xl"></i>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-black-700 hover:bg-accent-primary rounded-lg flex items-center justify-center transition-colors duration-300"
                >
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-black-700 hover:bg-accent-primary rounded-lg flex items-center justify-center transition-colors duration-300"
                >
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-black-700 hover:bg-accent-primary rounded-lg flex items-center justify-center transition-colors duration-300"
                >
                  <i className="fas fa-envelope text-xl"></i>
                </a>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="glass-effect p-8 rounded-xl border border-black-600 hover-lift">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-white-300 text-sm font-medium mb-2">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      {...form.register("name")}
                      className="bg-black-700/50 border-black-600 text-white-200 focus:border-accent-primary"
                      placeholder="Your Name"
                    />
                    {form.formState.errors.name && (
                      <p className="text-red-400 text-sm mt-1">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-white-300 text-sm font-medium mb-2">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register("email")}
                      className="bg-black-700/50 border-black-600 text-white-200 focus:border-accent-primary"
                      placeholder="your.email@example.com"
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-400 text-sm mt-1">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="subject" className="text-white-300 text-sm font-medium mb-2">
                    Subject *
                  </Label>
                  <Input
                    id="subject"
                    {...form.register("subject")}
                    className="bg-black-700/50 border-black-600 text-white-200 focus:border-accent-primary"
                    placeholder="Project Inquiry"
                  />
                  {form.formState.errors.subject && (
                    <p className="text-red-400 text-sm mt-1">
                      {form.formState.errors.subject.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-white-300 text-sm font-medium mb-2">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    rows={5}
                    {...form.register("message")}
                    className="bg-black-700/50 border-black-600 text-white-200 focus:border-accent-primary resize-none"
                    placeholder="Tell me about your project or just say hello..."
                  />
                  {form.formState.errors.message && (
                    <p className="text-red-400 text-sm mt-1">
                      {form.formState.errors.message.message}
                    </p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full button-3d disabled:bg-black-600 text-black-900 font-semibold py-3 px-6 disabled:hover:scale-100"
                >
                  {contactMutation.isPending ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
                
                {showSuccess && (
                  <div className="bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 p-4 rounded-lg">
                    <i className="fas fa-check-circle mr-2"></i>
                    Thank you for your message! I'll get back to you soon.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
