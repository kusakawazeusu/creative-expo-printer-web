import "./globals.css";

export const metadata = {
  title: "自助掃描機",
  description: "自助掃描機",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
