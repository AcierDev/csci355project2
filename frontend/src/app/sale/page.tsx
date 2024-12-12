"use client";

import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";
import styles from "./styles.module.css";

interface Product {
  name: string;
  price: number;
  image: string;
}

export default function Sale() {
  const { addToCart } = useCart();

  const products: Product[] = [
    {
      name: "High-Performance Laptop",
      price: 1299.99,
      image:
        "https://cdn.thewirecutter.com/wp-content/media/2023/11/laptops-2048px-8826.jpg",
    },
    {
      name: "Flagship Smartphone",
      price: 799.99,
      image:
        "https://www.cnet.com/a/img/resize/e300c2e8240354a6d069f088d2c53984e609be45/hub/2024/03/20/4c094675-5170-4a19-b430-38d1ea77a5b9/moto-g-power-5g-7812.jpg?auto=webp&height=500",
    },
    {
      name: "Wireless Noise-Cancelling Headphones",
      price: 249.99,
      image:
        "https://media.wired.com/photos/6014a6587201ff6c1ba30bcb/3:2/w_2400,h_1600,c_limit/Gear-Apple-Airpods-Max-Angle-SOURCE-Apple.jpg",
    },
    {
      name: "Smartwatch",
      price: 199.99,
      image:
        "https://img.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/UR3MEWQFGFDS3KAS6OQQR7INKU.jpg&high_res=true&w=2048",
    },
    {
      name: "Next-Gen Gaming Console",
      price: 499.99,
      image:
        "https://pikwizard.com/pw/medium/2708efc1a5ce5a05623072ddd5338c49.jpg",
    },
    {
      name: "Latest-Gen Tablet",
      price: 499.99,
      image:
        "https://cdn.thewirecutter.com/wp-content/media/2024/06/besttablets-2048px-9875.jpg",
    },
    {
      name: "4K Camera Drone",
      price: 799.99,
      image:
        "https://media.wired.com/photos/5e3b20fb33fa920008cbf819/master/pass/Gear-Feature-DJI-Mavic-Mini-Flying-SOURCE-DJI.jpg",
    },
    {
      name: "Virtual Reality Headset",
      price: 349.99,
      image:
        "https://cdn.thewirecutter.com/wp-content/media/2024/10/vrheadsets-2048px-08406.jpg",
    },
    {
      name: "Ergonomic Gaming Chair",
      price: 199.99,
      image:
        "https://m.media-amazon.com/images/I/817VI3DpflL._AC_UF894,1000_QL80_.jpg",
    },
    {
      name: "Smart Light Bulbs (4-pack)",
      price: 49.99,
      image:
        "https://m.media-amazon.com/images/I/51Ey-XWlrAL._AC_UF894,1000_QL80_.jpg",
    },
    {
      name: "Action Camera",
      price: 299.99,
      image:
        "https://media.wired.com/photos/6511b1fe189c419c40374c94/master/pass/DJI-Action-4-Camera-Featured-Gear.jpg",
    },
    {
      name: "Portable Power Bank",
      price: 39.99,
      image:
        "https://i5.walmartimages.com/seo/Anker-PowerCore-Select-10000-Portable-Charger-Black-Ultra-Compact-High-Speed-Charging-Technology-Phone-Charger-for-iPhone-Samsung-and-More_621e9d8d-b4b2-4e15-b4cd-b439561ec4d0.c822834630c31c13416f2aacb33ddd5e.jpeg",
    },
    {
      name: "Voice-Controlled Smart Speaker",
      price: 129.99,
      image:
        "https://cdn.thewirecutter.com/wp-content/media/2024/06/smart-speaker-2048px-1532.jpg",
    },
    {
      name: "RGB Mechanical Keyboard",
      price: 89.99,
      image:
        "https://www.cnet.com/a/img/resize/b492180385d7c2e5b941261631753f1eb34da17e/hub/2021/08/20/453e37bf-61cb-4e16-ad90-fd822bdc390a/keychron-k3-mechanical-keyboard.jpg?auto=webp&fit=crop&height=675&width=1200",
    },
    {
      name: "Smart Thermostat",
      price: 149.99,
      image: "https://cdn.mos.cms.futurecdn.net/Ek2kyrb7BqbAZXepGvvVYL.jpg",
    },
  ];

  const handleAddToCart = (product: Product, quantity: number) => {
    addToCart({
      name: product.name,
      price: product.price,
      quantity: quantity,
    });
  };

  return (
    <>
      <main className={styles.productSection}>
        <section className={styles.intro}>
          <h1>Welcome to EGGTech's Exclusive Sale</h1>
        </section>

        <div className={styles.productGrid}>
          {products.map((product, index) => (
            <div key={index} className={styles.productCard}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
              />
              <h3>{product.name}</h3>
              <p className={styles.price}>${product.price}</p>
              <div className={styles.quantityControls}>
                <button className={styles.decreaseQuantity}>-</button>
                <span className={styles.quantity}>1</span>
                <button className={styles.increaseQuantity}>+</button>
              </div>
              <button
                className={styles.addToCart}
                onClick={() => handleAddToCart(product, 1)}
              >
                <i className="fas fa-cart-plus"></i> Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
