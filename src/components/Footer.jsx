export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content">
      <div className="w-[95vw] mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-3">Mediverse</h2>
          <p className="text-sm text-base-content/70">
            Your trusted online pharmacy for genuine medicines and healthcare
            essentials. Safe. Reliable. Affordable.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/shop" className="hover:underline">Shop</a></li>
            <li><a href="/faq" className="hover:underline">FAQs</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="font-semibold mb-3">Contact Us</h3>
          <p className="text-sm">📍 Dhaka, Bangladesh</p>
          <p className="text-sm">📞 +880 1234-567890</p>
          <p className="text-sm">✉️ support@mediverse.com</p>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold mb-3">Stay Updated</h3>
          <p className="text-sm mb-3 text-base-content/70">
            Subscribe to get the latest updates and offers.
          </p>
          <div className="join w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered join-item w-full"
            />
            <button className="btn btn-primary join-item">Subscribe</button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-base-content/10 py-4 text-center text-sm text-base-content/70">
        © {new Date().getFullYear()} Mediverse. All rights reserved.
      </div>
    </footer>
  );
}
