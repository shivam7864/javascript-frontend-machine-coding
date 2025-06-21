import React, { useRef, useState } from "react";

const IMAGE_ARRAY = [
  {
    title: "Mountain View",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Ocean Breeze",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "City Lights",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Forest Trail",
    image:
      "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Desert Dunes",
    image:
      "https://images.unsplash.com/photo-1520440718111-45fe694b330a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const Image = () => {
  const n = IMAGE_ARRAY.length;
  const [currentImage, setCurrentImage] = useState(0);
  const intervalRef = useRef(null);

  const handleFunc = (next = true) => {
    setCurrentImage((prev) => (next ? (prev + 1) % n : (n + prev - 1) % n));
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const startAutoSlide = () => {
    // stopAutoSlide(); // Prevent multiple intervals
    intervalRef.current = setInterval(() => {
      handleFunc(true);
    }, 2000);
  };
  return (
    <div>
      <h2>Image Carousel</h2>
      <div
        className="card"
        onMouseEnter={stopAutoSlide}
        onMouseLeave={startAutoSlide}
        style={{
          width: "100%",
          maxWidth: "800px",
          margin: "auto",
          backgroundImage: `url(${IMAGE_ARRAY[currentImage].image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
          color: "white",
          justifyContent: "center",
          fontSize: "24px",
          fontWeight: "bold",
          borderRadius: "12px",
          textShadow: "1px 1px 4px black",
          transition: "background-image 0.5s ease-in-out",
          textAlign: "center",
        }}
      >
        {IMAGE_ARRAY[currentImage].title}
      </div>

      <div style={{ marginTop: "10px",textAlign:"center" }}>
        <button onClick={() => handleFunc(false)}>Prev</button>
        <button onClick={() => handleFunc(true)}>Next</button>
      </div>
    </div>
  );
};

export default Image;
