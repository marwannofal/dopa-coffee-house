import { assets } from "@/data/assets";
import type { MenuItem } from "@/types/menu";

type MenuSeed = Omit<MenuItem, "id" | "price" | "image" | "available" | "featured"> & {
  image: keyof typeof assets.menu.real;
  featured?: boolean;
};

const seed = (item: MenuSeed, id: number): MenuItem => ({
  ...item,
  id,
  price: null,
  image: assets.menu.real[item.image],
  featured: item.featured ?? false,
  available: true,
});

const drink = (
  item: Omit<MenuSeed, "mainType" | "milkOptions" | "availableSizes" | "dietaryTags"> &
    Partial<Pick<MenuSeed, "milkOptions" | "availableSizes" | "dietaryTags">>,
  id: number,
) =>
  seed(
    {
      ...item,
      mainType: "Drinks",
      milkOptions: item.milkOptions ?? ["Full Cream", "Oat", "Almond"],
      availableSizes: item.availableSizes ?? ["Regular"],
      dietaryTags: item.dietaryTags ?? ["Vegetarian"],
    },
    id,
  );

export const menuItems: MenuItem[] = [
  drink({ image: "espresso", name: "Espresso", slug: "espresso", description: "A short, intense pour with a rich crema and a clean chocolate finish.", category: "Coffee", temperature: ["Hot"], flavor: ["Classic", "Cocoa"] }, 1),
  drink({ image: "cortado", name: "Cortado", slug: "cortado", description: "Balanced espresso softened with just enough warm milk for a silky, bold sip.", category: "Coffee", temperature: ["Hot"], flavor: ["Classic"], milkOptions: ["Full Cream", "Oat"] }, 2),
  drink({ image: "flat-white-cappuccino", name: "Flat White Cappuccino", slug: "flat-white-cappuccino", description: "Velvety microfoam meets a full-bodied espresso blend in a smooth café classic.", category: "Coffee", temperature: ["Hot"], flavor: ["Classic"], milkOptions: ["Full Cream", "Oat"] }, 3),
  drink({ image: "hot-americano", name: "Hot Americano", slug: "hot-americano", description: "Espresso stretched with hot water for a bright aroma and a crisp, lingering finish.", category: "Coffee", temperature: ["Hot"], flavor: ["Classic"] }, 4),
  drink({ image: "iced-americano", name: "Iced Americano", slug: "iced-americano", description: "Double espresso over ice and cool water for a clean, refreshing coffee hit.", category: "Coffee", temperature: ["Cold"], flavor: ["Classic"] }, 5),
  drink({ image: "hot-latte", name: "Hot Latte", slug: "hot-latte", description: "Smooth espresso and steamed milk, finished with a delicate layer of silky foam.", category: "Coffee", temperature: ["Hot"], flavor: ["Classic"], milkOptions: ["Full Cream", "Oat", "Almond"] }, 6),
  drink({ image: "iced-latte", name: "Iced Latte", slug: "iced-latte", description: "Chilled milk and espresso poured over ice for an easy, creamy everyday favorite.", category: "Coffee", temperature: ["Cold"], flavor: ["Classic"], milkOptions: ["Full Cream", "Oat", "Almond"] }, 7),
  drink({ image: "iced-latte-talabat", name: "Iced Latte — Talabat", slug: "iced-latte-talabat", description: "Our chilled espresso and milk classic, made for a smooth sip on the go.", category: "Coffee", temperature: ["Cold"], flavor: ["Classic"], milkOptions: ["Full Cream", "Oat", "Almond"] }, 8),
  drink({ image: "hot-spanish-latte", name: "Hot Spanish Latte", slug: "hot-spanish-latte", description: "Bold espresso, creamy milk, and a touch of sweetness in our signature comfort cup.", category: "Coffee", temperature: ["Hot"], flavor: ["Spanish Latte"], featured: true }, 9),
  drink({ image: "iced-spanish-latte", name: "Iced Spanish Latte", slug: "iced-spanish-latte", description: "Our signature sweet latte served cold, creamy, and perfectly refreshing over ice.", category: "Coffee", temperature: ["Cold"], flavor: ["Spanish Latte"], featured: true }, 10),
  drink({ image: "hot-pistachio-latte", name: "Hot Pistachio Latte", slug: "hot-pistachio-latte", description: "Roasted pistachio sweetness folded into espresso and warm, velvety milk.", category: "Coffee", temperature: ["Hot"], flavor: ["Pistachio"], featured: true }, 11),
  drink({ image: "iced-pistachio-latte", name: "Iced Pistachio Latte", slug: "iced-pistachio-latte", description: "Nutty pistachio cream, espresso, and cold milk come together in a silky iced latte.", category: "Coffee", temperature: ["Cold"], flavor: ["Pistachio"], featured: true }, 12),
  drink({ image: "iced-caramel-latte", name: "Iced Caramel Latte", slug: "iced-caramel-latte", description: "Chilled espresso and creamy milk finished with golden caramel for a bright sweet lift.", category: "Coffee", temperature: ["Cold"], flavor: ["Caramel"] }, 13),
  drink({ image: "hot-dark-mocha", name: "Hot Dark Mocha", slug: "hot-dark-mocha", description: "Deep cocoa and espresso wrapped in steamed milk for a rich, warming chocolate cup.", category: "Coffee", temperature: ["Hot"], flavor: ["Mocha", "Chocolate"] }, 14),
  drink({ image: "iced-dark-mocha", name: "Iced Dark Mocha", slug: "iced-dark-mocha", description: "Dark chocolate, espresso, and cold milk over ice for a decadent chilled treat.", category: "Coffee", temperature: ["Cold"], flavor: ["Mocha", "Chocolate"] }, 15),
  drink({ image: "hot-white-mocha", name: "Hot White Mocha", slug: "hot-white-mocha", description: "Espresso and creamy white chocolate meet in a softly sweet, comforting latte.", category: "Coffee", temperature: ["Hot"], flavor: ["Mocha", "White Chocolate"] }, 16),
  drink({ image: "iced-white-mocha", name: "Iced White Mocha", slug: "iced-white-mocha", description: "A smooth white chocolate mocha poured cold over ice for a silky sweet finish.", category: "Coffee", temperature: ["Cold"], flavor: ["Mocha", "White Chocolate"] }, 17),
  drink({ image: "iced-specialty-v60", name: "Iced Specialty V60", slug: "iced-specialty-v60", description: "A bright, hand-brewed V60 served chilled to spotlight every delicate coffee note.", category: "Coffee", temperature: ["Cold"], flavor: ["Specialty Coffee"] }, 18),
  drink({ image: "iced-matcha-latte", name: "Iced Matcha Latte", slug: "iced-matcha-latte", description: "Stone-ground matcha shaken with cold milk for a smooth, gently earthy refreshment.", category: "Non-coffee", temperature: ["Cold"], flavor: ["Matcha"], milkOptions: ["Full Cream", "Oat", "Almond"], featured: true }, 19),
  drink({ image: "iced-vanilla-matcha", name: "Iced Vanilla Matcha", slug: "iced-vanilla-matcha", description: "Earthy matcha brightened with soft vanilla and chilled milk in a creamy green sip.", category: "Non-coffee", temperature: ["Cold"], flavor: ["Matcha", "Vanilla"], milkOptions: ["Full Cream", "Oat", "Almond"] }, 20),
  drink({ image: "strawberry-matcha", name: "Strawberry Matcha", slug: "strawberry-matcha", description: "Juicy strawberry and vibrant matcha layered over cold milk for a playful contrast.", category: "Non-coffee", temperature: ["Cold"], flavor: ["Matcha", "Strawberry"], milkOptions: ["Full Cream", "Oat", "Almond"], badge: "New" }, 21),
  drink({ image: "premium-sour-candy-matcha", name: "Premium Sour Candy Matcha", slug: "premium-sour-candy-matcha", description: "Premium matcha, chilled milk, and pea flowers with a bright sour-candy twist.", category: "Non-coffee", temperature: ["Cold"], flavor: ["Matcha", "Sour Candy"], milkOptions: ["Full Cream", "Oat", "Almond"], badge: "New" }, 22),
  drink({ image: "premium-cotton-candy-matcha", name: "Premium Cotton Candy Matcha", slug: "premium-cotton-candy-matcha", description: "Premium matcha with dragon fruit, lychee, and chilled milk for a soft candy-like sweetness.", category: "Non-coffee", temperature: ["Cold"], flavor: ["Matcha", "Lychee", "Dragon Fruit"], milkOptions: ["Full Cream", "Oat", "Almond"], badge: "New" }, 23),
  drink({ image: "caramel-frappe", name: "Caramel Frappe", slug: "caramel-frappe", description: "A frosty caramel blend with a creamy body and a lush, café-style finish.", category: "Frappes", temperature: ["Cold"], flavor: ["Caramel"], badge: "Popular" }, 24),
  drink({ image: "lotus-frappe", name: "Lotus Frappe", slug: "lotus-frappe", description: "Sweet Lotus biscuit flavor blended into an icy, creamy frappe made for slow sips.", category: "Frappes", temperature: ["Cold"], flavor: ["Lotus", "Biscuit"] }, 25),
  drink({ image: "pistachio-frappe", name: "Pistachio Frappe", slug: "pistachio-frappe", description: "A cool pistachio blend with a rich nutty finish and plenty of creamy texture.", category: "Frappes", temperature: ["Cold"], flavor: ["Pistachio"] }, 26),
  drink({ image: "vanilla-frappe", name: "Vanilla Frappe", slug: "vanilla-frappe", description: "Classic vanilla blended icy smooth for a mellow, creamy escape.", category: "Frappes", temperature: ["Cold"], flavor: ["Vanilla"] }, 27),
  drink({ image: "tiramisu-frappe", name: "Tiramisu Frappe", slug: "tiramisu-frappe", description: "Coffee, cocoa, and creamy tiramisu flavor spun into a frosty indulgence.", category: "Frappes", temperature: ["Cold"], flavor: ["Tiramisu", "Coffee", "Cocoa"] }, 28),
  drink({ image: "white-chocolate-hazelnut-frappe", name: "White Chocolate Hazelnut Frappe", slug: "white-chocolate-hazelnut-frappe", description: "Silky white chocolate and toasted hazelnut blended into a rich, chilled treat.", category: "Frappes", temperature: ["Cold"], flavor: ["White Chocolate", "Hazelnut"] }, 29),
  drink({ image: "cheseecake-shake", name: "Cheesecake Shake", slug: "cheesecake-shake", description: "A creamy cheesecake-inspired shake with a lush dessert finish in every sip.", category: "Shakes", temperature: ["Cold"], flavor: ["Cheesecake"], badge: "New" }, 30),
  drink({ image: "flan-shake", name: "Flan Shake", slug: "flan-shake", description: "Silky custard flan flavor blended into a cool, indulgent shake.", category: "Shakes", temperature: ["Cold"], flavor: ["Flan", "Caramel"], badge: "New" }, 31),
  drink({ image: "blueberry-smoothie", name: "Blueberry Smoothie", slug: "blueberry-smoothie", description: "Lush blueberries blended smooth for a cool, fruity burst of color and flavor.", category: "Smoothies", temperature: ["Cold"], flavor: ["Blueberry"], milkOptions: ["Yogurt", "Oat"], dietaryTags: ["Vegetarian", "Gluten Free"], featured: true }, 32),
  drink({ image: "strawberry-smoothie", name: "Strawberry Smoothie", slug: "strawberry-smoothie", description: "Ripe strawberry blended into a bright, creamy smoothie that tastes like summer.", category: "Smoothies", temperature: ["Cold"], flavor: ["Strawberry"], milkOptions: ["Yogurt", "Oat"], dietaryTags: ["Vegetarian", "Gluten Free"] }, 33),
  drink({ image: "kiwi-green-apple-smoothie", name: "Kiwi Green Apple Smoothie", slug: "kiwi-green-apple-smoothie", description: "Tart kiwi and crisp green apple blended into a clean, lively fruit refreshment.", category: "Smoothies", temperature: ["Cold"], flavor: ["Kiwi", "Green Apple"], milkOptions: ["Yogurt", "Oat"], dietaryTags: ["Vegan", "Gluten Free"] }, 34),
  drink({ image: "mango-and-passion-fruit-smoothie", name: "Mango and Passion Fruit Smoothie", slug: "mango-and-passion-fruit-smoothie", description: "Tropical mango and bright passion fruit blended into a sunny, silky smoothie.", category: "Smoothies", temperature: ["Cold"], flavor: ["Mango", "Passion Fruit"], milkOptions: ["Yogurt", "Oat"], dietaryTags: ["Vegan", "Gluten Free"], featured: true }, 35),
];

export const featuredMenuItems = menuItems.filter((item) => item.featured);
