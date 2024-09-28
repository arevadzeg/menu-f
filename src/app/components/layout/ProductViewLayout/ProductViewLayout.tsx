import ProductCard from "../../product/PorductCard/ProductCard";

const menuDishes = [
  {
    title: "Grilled Salmon",
    price: "$25.99",
    isOnSale: true,
    image:
      "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg",
  },
  {
    title: "Margherita Pizza",
    price: "$18.50",
    isOnSale: false,
    image:
      "https://img.freepik.com/free-photo/tasty-burger-isolated-white-background-fresh-hamburger-fastfood-with-beef-cheese_90220-1063.jpg",
  },
  {
    title: "Spaghetti Carbonara",
    price: "$20.99",
    isOnSale: true,
    image:
      "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2016/6/12/3/FNM070116_Penne-with-Vodka-Sauce-and-Mini-Meatballs-recipe_s4x3.jpg.rend.hgtvcom.1280.1280.suffix/1465939620872.jpeg",
  },
  {
    title: "Caesar Salad",
    price: "$12.50",
    isOnSale: false,
    image:
      "https://cdn.pixabay.com/photo/2016/12/26/17/28/spaghetti-1932466_640.jpg",
  },
  {
    title: "Chicken Tacos",
    price: "$15.99",
    isOnSale: true,
    image: "https://blog.nasm.org/hubfs/healthy-fats-foods.jpg",
  },
  {
    title: "Steak Frites",
    price: "$32.99",
    isOnSale: false,
    image:
      "https://cdn.tasteatlas.com/Images/Dishes/d9ae0ef06bc54f7cb4e6b5b928bc6f41.jpg?m=facebook",
  },
  {
    title: "Lobster Roll",
    price: "$28.50",
    isOnSale: true,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiMkiuoephsvJqxOpncfzW3lM__tCt7nn4ng&s",
  },
  {
    title: "Vegetarian Sushi",
    price: "$22.99",
    isOnSale: false,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD8kvIptaasRbZf8PCCjub4HCp-Q89r4-Enw&s",
  },
  {
    title: "Beef Burger",
    price: "$17.99",
    isOnSale: true,
    image:
      "https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg",
  },
  {
    title: "Chocolate Lava Cake",
    price: "$10.99",
    isOnSale: false,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR--qbI4ljrN4v76yj8UQIMQKmSuIwMaHCjDGg3ASEE3wo9aRb2gCoIMRWyWPEJFKdSJ4Y&usqp=CAU",
  },
];

const ProductViewLayout = () => {
  return (
    <div className="p-8 flex gap-16 flex-wrap justify-center">
      {menuDishes.map((dish, index) => (
        <ProductCard
          key={index}
          title={dish.title}
          price={dish.price}
          isOnSale={dish.isOnSale}
          image={dish.image}
        />
      ))}{" "}
    </div>
  );
};

export default ProductViewLayout;
