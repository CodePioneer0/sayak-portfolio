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
            Get In <span className="text-cyan-400">Touch</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-cyan-400">Let's Connect</h3>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology. Feel free to reach out!
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-envelope text-cyan-400 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Email</p>
                    <p className="text-slate-200">alex.chen@email.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-phone text-cyan-400 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Phone</p>
                    <p className="text-slate-200">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-map-marker-alt text-cyan-400 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Location</p>
                    <p className="text-slate-200">San Francisco, CA</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <a
                  href="#"
                  className="w-12 h-12 bg-slate-700 hover:bg-cyan-500 rounded-lg flex items-center justify-center transition-colors duration-300"
                >
                  <i className="fab fa-github text-xl"></i>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-slate-700 hover:bg-cyan-500 rounded-lg flex items-center justify-center transition-colors duration-300"
                >
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-slate-700 hover:bg-cyan-500 rounded-lg flex items-center justify-center transition-colors duration-300"
                >
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-slate-700 hover:bg-cyan-500 rounded-lg flex items-center justify-center transition-colors duration-300"
                >
                  <i className="fas fa-envelope text-xl"></i>
                </a>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-slate-300 text-sm font-medium mb-2">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      {...form.register("name")}
                      className="bg-slate-700/50 border-slate-600 text-slate-200 focus:border-cyan-400"
                      placeholder="Your Name"
                    />
                    {form.formState.errors.name && (
                      <p className="text-red-400 text-sm mt-1">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-slate-300 text-sm font-medium mb-2">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register("email")}
                      className="bg-slate-700/50 border-slate-600 text-slate-200 focus:border-cyan-400"
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
                  <Label htmlFor="subject" className="text-slate-300 text-sm font-medium mb-2">
                    Subject *
                  </Label>
                  <Input
                    id="subject"
                    {...form.register("subject")}
                    className="bg-slate-700/50 border-slate-600 text-slate-200 focus:border-cyan-400"
                    placeholder="Project Inquiry"
                  />
                  {form.formState.errors.subject && (
                    <p className="text-red-400 text-sm mt-1">
                      {form.formState.errors.subject.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-slate-300 text-sm font-medium mb-2">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    rows={5}
                    {...form.register("message")}
                    className="bg-slate-700/50 border-slate-600 text-slate-200 focus:border-cyan-400 resize-none"
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
                  className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600 text-slate-900 font-semibold py-3 px-6 transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
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
