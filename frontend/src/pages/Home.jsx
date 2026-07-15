import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import FeaturedProducts from "../components/FeaturedProducts";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";
const products = [
  {
    id: 1,
    name: "iPhone 15",
    price: "₹79,999",
    image: "https://picsum.photos/300/200?1",
  },
  {
    id: 2,
    name: "Laptop",
    price: "₹59,999",
    image: "https://picsum.photos/300/200?2",
  },
  {
    id: 3,
    name: "Headphones",
    price: "₹2,999",
    image: "https://picsum.photos/300/200?3",
  },
  {
    id: 4,
    name: "Smart Watch",
    price: "₹4,999",
    image: "https://picsum.photos/300/200?4",
  },
];

function Home() {
  return (
    <>
            <Navbar />
       
  <Hero />
  <CategorySection />
<FeaturedProducts />
<WhyChooseUs/>
<Footer/>
      {/* Hero */}
      

         
    </>
  );
}

export default Home;