import { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Nylon Backpack with Plush Charm",
    price: 185,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600",
    altText: "A premium minimalist brown canvas backpack featuring a clean, structured design with a front zippered pocket and a cute white puppy plush keychain hanging from the zipper. Presented in a professional high-key studio photo with a seamless background.",
    tag: "Trending",
    colors: [
      { name: "Brown", hex: "#8b5a2b" },
      { name: "Off-White", hex: "#f5f5f0" }
    ],
    material: "Nylon",
    category: "Backpack"
  },
  {
    id: "2",
    name: "Charter Backpack",
    price: 255,
    originalPrice: 425,
    image: "https://lh3.googleusercontent.com/aida/AP1WRLtV0ymGPeJ-QQBcOpQOljlDPX7Ka9ovcNqmisIVYud4vqmPBq6pLW0VUdwYXoLgM98iB2U3qYCNJdds75qdRtbEg7jHyFKKAqpM9yOJdhtMEJKIRR58kaV1fQvp5lr3G3h3-4SPa3yf4DmMGMpq_Lk6F7pERHeTPu1JHjT-ePHbWlyWrPq4e0Oin1TJO0oanlKcdxi5weLDKjjSTmtOu8rr63Hp0h2DYMNiEedHdSUL6rncE0pa1Elm_ps",
    altText: "A professional Charter Backpack in signature canvas featuring the iconic Coach pattern in charcoal grey and black. The lighting is crisp and even, emphasizing the structured design and luxury materials. The image is set against a minimalist light-mode background consistent with refined luxury branding.",
    colors: [
      { name: "Charcoal", hex: "#1c1c1c" }
    ],
    material: "Canvas",
    category: "Backpack"
  },
  {
    id: "3",
    name: "Gotham Duffle Bag 45",
    price: 330,
    originalPrice: 550,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvIZpOXMJL7jZT44-F2PzLnQiz846q7jN9vHFfsT1qz1IAxu3irglS-cFn9yQEy6U6jxIz32vlKpGjmn9J_zBeosqt8qun8MQF0FIa_G9-lVRmyTc5f42DEEREsTgnMjzNNNjrT1azvmbPJqcUVrC2Oz_b3K7iMsZQk-XwCjWQWxN0o2DIcdz8STMbIEXeZ7Vp0IqCbgLNg71mXo0uU656_AJ_L0iz4MVptzz7P1B6TOl-1H419yo6",
    altText: "A luxury brown leather Gotham Duffle Bag 45 shown from a three-quarter angle. The leather has a rich pebbled texture illuminated by soft, directional light that creates subtle highlights and deep shadows for a sense of depth. The background is a consistent minimalist light grey, maintaining a high-fashion tone.",
    colors: [
      { name: "Saddle Brown", hex: "#8B4513" }
    ],
    material: "Leather",
    category: "Duffle"
  },
  {
    id: "4",
    name: "Clinton Crossbody Bag",
    price: 195,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSUcFfhBUTPOw3ikJVFQagnZSyltH1yOHmq-mwmHp7MibtzOrsUvg_fNB2IYARrMkFVIp378ebk5m6Fg3O4q2N9od7XmEXxPGs39WnYghhpbl7oA4SWAfaOi65B9yaZVCNa__HVUw2flMbOnxAzU0K9JTCKdKq9X8n1SJv0193J3C9eqkR9dGEuqcKnqEweI2g9KZ4gEp2IdPH4qE8vK_lO-q_gjkdNLrrf8gHB67W5TDRei_025tj",
    altText: "A modern, black Clinton Crossbody Bag with clean lines and minimal hardware. The bag is photographed in a high-key studio environment with neutral grey tones. Precision detail on the stitching and high-quality leather finish. Elegant, corporate modernist aesthetic with emphasis on utility and timeless style.",
    colors: [
      { name: "Black", hex: "#000000" }
    ],
    material: "Leather",
    category: "Crossbody"
  },
  {
    id: "5",
    name: "Radio Camera Bag",
    price: 250,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDm9vSneETKKJ5JdTd4WzKlNEvO5hq2TeVo5w-AAyCRu4OgXRRodEF5cUMyFZnQtetiNPBsBTNhOxGtKZjaRWLel9MtQEiySd6MzmGf1ces1-zk3m2iSN7CGsMsiaJHfwN8e80NjwMnX8b0Pr0yaal1wbxLHfLZNg-9sfKHBsYfYqnPEeW7U0Z7DOxbx7ZjdvY0X7HnLUP_u3AbnbaPxwqkxwK8F24rsLUQNzuasL1vKkb4thsdd1WF",
    altText: "A stylish Radio Camera Bag in black polished pebble leather. The bag is presented in a minimalist, architectural composition. Soft ambient lighting showcases the luxury grain of the leather. The background is a pristine, stark white, reinforcing the refined luxury and editorial pace of the design system.",
    colors: [
      { name: "Black", hex: "#000000" }
    ],
    material: "Leather",
    category: "Camera"
  },
  {
    id: "6",
    name: "Hitch Backpack",
    price: 650,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVxLrSXeTOkQ58iDRmOPwFzpeU8iAgSPw3kUrkj186qFtQY56pbqXFU5V_VYdt2psEXd81JuvDGtXixQzOsTa-gM1ORY3LrKlkcMBCoMRN0M9kV5Wcwpu67GGHt2_hMbgkCkoqjyvDA3VoH1wgZsyquNY2qiWiQOMNqdxykGQG5ZIB9u0947Ljc9co5EsoJ4OCQylFpslpiqtFYET7f3yNAhcgp6wl6WRaxIGGMxs2Euiwq75QLZK_",
    altText: "A sophisticated men's Hitch Backpack in rich mahogany leather. The backpack is designed with structural precision and high-contrast details. The lighting is editorial and sharp, creating a high-end fashion catalog look. Deep blacks and warm browns define the color story against a bright light-mode studio setting.",
    colors: [
      { name: "Mahogany", hex: "#4A2C2A" }
    ],
    material: "Leather",
    category: "Backpack"
  }
];
