import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Vicky's Place" },
      {
        name: "description",
        content: "Get in touch with Vicky's Place. Visit our store or send us a message.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!name || !email || !message) {
      setError("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    // Simulate form submission
    console.log("Contact form submission:", { name, email, message });
    setSuccess(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="border-b border-border bg-card">
      <div className="mx-auto max-w-[88rem] px-5 py-20 sm:px-8">
        <p className="label-caps text-gold">Contact</p>
        <h1 className="mt-6 text-4xl md:text-5xl">Get in touch</h1>
        <div className="gold-rule my-8" />
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-lg">Visit Us</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                18 Rosemary Lane
                <br />
                Accra, Ghana
                <br />
                GPS: AK-039-5028
              </p>
            </div>
            <div>
              <h3 className="font-serif text-lg">Hours</h3>
              <p className="mt-2 text-sm text-muted-foreground">Mon–Sat, 10am–7pm</p>
            </div>
            <div>
              <h3 className="font-serif text-lg">Email</h3>
              <p className="mt-2 text-sm text-muted-foreground">hello@vickysplace.com</p>
            </div>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="label-caps text-sm">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="label-caps text-sm">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="label-caps text-sm">Message</label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-2 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
                placeholder="How can we help?"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            {success && <p className="text-sm text-green-600">Message sent successfully!</p>}
            <button
              type="submit"
              className="h-11 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
