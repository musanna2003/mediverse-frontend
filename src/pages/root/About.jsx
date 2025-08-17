import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-10">
      <div className="max-w-4xl w-full bg-base-100/30 backdrop-blur-xl border border-base-content/10 shadow-xl rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-center mb-6">About Mediverse</h1>
        <p className="text-base-content/80 text-center mb-8">
          Welcome to <span className="font-semibold">Mediverse</span> – your trusted
          online pharmacy and healthcare partner. We are committed to making
          healthcare more accessible, reliable, and affordable for everyone.
        </p>

        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-xl bg-base-100/40 shadow">
            <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
            <p className="text-sm text-base-content/70">
              To provide genuine medicines, healthcare essentials, and wellness
              products at your fingertips with trusted delivery.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-base-100/40 shadow">
            <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
            <p className="text-sm text-base-content/70">
              To create a healthier world where healthcare is convenient,
              transparent, and available to everyone.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-base-100/40 shadow">
            <h2 className="text-xl font-semibold mb-2">Why Choose Us</h2>
            <p className="text-sm text-base-content/70">
              Safe medicines, verified products, fast delivery, and
              customer-focused service that you can rely on.
            </p>
          </div>
        </div>

        
      </div>
    </div>
  );
}
