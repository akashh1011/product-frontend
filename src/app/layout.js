import "../globals.css";

export const metadata = {
  title: "Inventory - Products",
  description: "Product search, import/export, inline editing, inventory history",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
