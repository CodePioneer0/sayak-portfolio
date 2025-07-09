import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema, type InsertContactMessage } from "@/schemas/contact";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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

  // Using Formspree - this will send form data to your sayaksen8017@gmail.com email
  // Formspree ID: mjkrqzoj

  const onSubmit = (data: InsertContactMessage) => {
    console.log("Submitting form to Formspree with data:", data);
    
    // Using direct fetch API as a more reliable method
    fetch("https://formspree.io/f/mjkrqzoj", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        console.log("Formspree response status:", response.status);
        
        if (!response.ok) {
          throw new Error(`Formspree submission failed with status ${response.status}`);
        }
        
        return response.json();
      })
      .then(responseData => {
        console.log("Formspree success response:", responseData);
        
        setShowSuccess(true);
        form.reset();
        toast({
          title: "Message sent successfully!",
          description: "Thank you for your message. I'll get back to you soon.",
        });
        
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      })
      .catch((error) => {
        console.error("Contact form error:", error);
        
        toast({
          title: "Failed to send message",
          description: "Please try again later or contact me directly.",
          variant: "destructive",
        });
      });
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
                I'm always open to discussing new opportunities, interesting projects or just having a chat about technology. Feel free to reach out!
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent-primary/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-envelope text-accent-primary text-xl"></i>
                  </div>
                  <div>
                    <p className="text-white-400 text-sm">Email</p>
                    <p className="text-white-200">sayaksen8017@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent-primary/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-phone text-accent-primary text-xl"></i>
                  </div>
                  <div>
                    <p className="text-white-400 text-sm">Phone</p>
                    <p className="text-white-200">+91 8017482733</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent-primary/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-map-marker-alt text-accent-primary text-xl"></i>
                  </div>
                  <div>
                    <p className="text-white-400 text-sm">Location</p>
                    <p className="text-white-200">West Bengal , India</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <a
                  href="https://github.com/CodePioneer0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-black-700 hover:bg-accent-primary rounded-lg flex items-center justify-center transition-colors duration-300"
                >
                  <i className="fab fa-github text-xl"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/sayak-sen-8a112412b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-black-700 hover:bg-accent-primary rounded-lg flex items-center justify-center transition-colors duration-300"
                >
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
                <a
                  href="https://x.com/LazyChief0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-black-700 hover:bg-accent-primary rounded-lg flex items-center justify-center transition-colors duration-300"
                >
                  <i className="fab fa-twitter text-xl"></i>
                </a>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="glass-effect p-8 rounded-xl border border-black-600 hover-lift">
              <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="space-y-6"
                action="https://formspree.io/f/mjkrqzoj"
                method="POST"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-white-300 text-sm font-medium mb-2">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      {...form.register("name")}
                      className="bg-black-700/50 border-black-600 text-accent-primary focus:border-accent-primary"
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
                      className="bg-black-700/50 border-black-600 text-accent-primary focus:border-accent-primary"
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
                    className="bg-black-700/50 border-black-600 text-accent-primary focus:border-accent-primary"
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
                    className="bg-black-700/50 border-black-600 text-accent-primary focus:border-accent-primary resize-none"
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
                  disabled={form.formState.isSubmitting}
                  className="w-full button-3d disabled:bg-black-600 text-black-900 font-semibold py-3 px-6 disabled:hover:scale-100"
                >
                  {form.formState.isSubmitting ? (
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
