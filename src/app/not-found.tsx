import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import NotFoundClient from "@/components/NotFoundClient";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-cream-50">
      <Navigation />
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-40 pb-20">
        <NotFoundClient />
      </main>
      <Footer />
    </div>
  );
}
