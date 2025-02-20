import { motion } from "framer-motion";
import { useState } from "react";

interface FormField {
  id: string;
  label: string;
  type: string;
  value: string;
}

export default function Contact() {
  const [formFields, setFormFields] = useState<FormField[]>([
    { id: "name", label: "Name", type: "text", value: "" },
    { id: "email", label: "Email", type: "email", value: "" },
    { id: "message", label: "Message", type: "textarea", value: "" },
  ]);

  const handleInputChange = (id: string, value: string) => {
    setFormFields(
      formFields.map((field) => (field.id === id ? { ...field, value } : field))
    );
  };

  return (
    <section id="contact" className="relative min-h-screen bg-background py-20">
      {/* Lens Effect Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.05 }}
          transition={{ duration: 1 }}
          className="absolute -left-1/4 bottom-1/4 w-[600px] h-[600px] border-[1px] border-white/20 rounded-full"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.03 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -right-1/4 top-1/4 w-[400px] h-[400px] border-[1px] border-white/20 rounded-full"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-primary mb-4 tracking-[0.3em] text-sm">
            GET IN TOUCH
          </h2>
          <h3 className="text-5xl font-light tracking-tight">Let's Connect</h3>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <h4 className="text-2xl font-light text-white mb-6">
                Let's Create Something Beautiful
              </h4>
              <p className="text-white/70 leading-relaxed">
                Whether you have a project in mind or just want to chat about
                photography, I'm here to help turn your vision into reality.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {[
                {
                  label: "Email",
                  value: "contact@photography.com",
                  href: "mailto:contact@photography.com",
                },
                {
                  label: "Phone",
                  value: "(123) 456-7890",
                  href: "tel:+11234567890",
                },
                {
                  label: "Location",
                  value: "New York, NY",
                  href: "#",
                },
              ].map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  whileHover={{ x: 10 }}
                  className="block group"
                >
                  <p className="text-sm text-white/50 mb-1">{item.label}</p>
                  <p className="text-white group-hover:text-primary transition-colors">
                    {item.value}
                  </p>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm text-white/50 mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {["Instagram", "Twitter", "Facebook"].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    whileHover={{ y: -5 }}
                    className="text-white/70 hover:text-primary transition-colors"
                  >
                    {social}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 p-8 backdrop-blur-sm"
          >
            <form className="space-y-8">
              {formFields.map((field) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <motion.label
                    htmlFor={field.id}
                    className={`absolute left-4 transition-all duration-300 ${
                      field.value
                        ? "-top-3 text-xs text-primary"
                        : "top-4 text-white/50"
                    }`}
                  >
                    {field.label}
                  </motion.label>
                  {field.type === "textarea" ? (
                    <textarea
                      id={field.id}
                      rows={4}
                      value={field.value}
                      onChange={(e) =>
                        handleInputChange(field.id, e.target.value)
                      }
                      className="w-full bg-transparent border border-white/20 rounded-none p-4 pt-6 text-white focus:border-primary focus:ring-0 transition-colors"
                    />
                  ) : (
                    <input
                      type={field.type}
                      id={field.id}
                      value={field.value}
                      onChange={(e) =>
                        handleInputChange(field.id, e.target.value)
                      }
                      className="w-full bg-transparent border border-white/20 rounded-none p-4 pt-6 text-white focus:border-primary focus:ring-0 transition-colors"
                    />
                  )}
                </motion.div>
              ))}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary text-white py-4 px-8 hover:bg-primary/90 transition-colors"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
