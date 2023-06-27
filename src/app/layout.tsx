import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/Providers";
import { getCurrentUser } from "@/lib/session";
import ThemeProvider from "@/Providers/ThemeProvider";

export const metadata = {
  title: "Reliable",
  description: "Showcase and discover remarkable developer projects",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser(); 
  console.log(currentUser); 
  return (
    <html lang="en">
      <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Provider>

          <Navbar currentUser={currentUser} />
          <main>{children}</main>
          <Toaster />
          <Footer />
        </Provider>
          </ThemeProvider>
      </body>
    </html>
  );
}
