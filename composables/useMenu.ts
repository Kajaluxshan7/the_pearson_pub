import { ref, computed } from "vue";
import type { MenuItem, MenuCategory } from "~/types/menu";

export const useMenu = () => {
  const menuCategories = ref<MenuCategory[]>([
    // Daily Specials
    {
      id: "daily-specials",
      name: "Daily Specials",
      description: "Fresh and exciting dishes that change daily",
      items: [
        {
          id: "special-1",
          name: "Today's Catch",
          description:
            "Fresh fish of the day served with seasonal vegetables and herb butter sauce",
          price: 24.99,
          category: "daily-specials",
          subCategory: "mains",
          image:
            "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: true,
          isPearsonFamous: false,
          allergens: ["fish", "dairy"],
        },
        {
          id: "special-2",
          name: "Chef's Special Pasta",
          description: "Handmade pasta with chef's special sauce of the day",
          price: 18.99,
          category: "daily-specials",
          subCategory: "mains",
          image:
            "https://images.unsplash.com/photo-1563379091339-03246963d725?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: true,
          isPearsonFamous: false,
        },
      ],
    },
    // All Day Menu
    {
      id: "all-day-menu",
      name: "All Day Menu",
      description: "Our classic dishes available throughout the day",
      items: [
        {
          id: "famous-1",
          name: "Pearson's Famous Fish & Chips",
          description:
            "Beer-battered cod, hand-cut chips, mushy peas, and tartare sauce",
          price: 16.99,
          category: "all-day-menu",
          subCategory: "mains",
          image:
            "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: true,
          isPearsonFamous: true,
          allergens: ["fish", "gluten"],
        },
        {
          id: "famous-2",
          name: "Signature Steak Pie",
          description:
            "Slow-cooked beef in rich gravy, topped with buttery pastry",
          price: 15.99,
          category: "all-day-menu",
          subCategory: "mains",
          image:
            "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: true,
          isPearsonFamous: true,
          allergens: ["gluten", "dairy"],
        },
        {
          id: "main-1",
          name: "Classic Burger",
          description:
            "Local beef patty, cheddar, lettuce, tomato, brioche bun",
          price: 14.99,
          category: "all-day-menu",
          subCategory: "mains",
          image:
            "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
          allergens: ["gluten", "dairy"],
        },
        {
          id: "main-2",
          name: "Shepherd's Pie",
          description: "Minced lamb, vegetables, mashed potato top",
          price: 13.99,
          category: "all-day-menu",
          subCategory: "mains",
          image:
            "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
          allergens: ["dairy"],
        },
        {
          id: "starter-1",
          name: "Scotch Eggs",
          description: "Hand-breaded eggs with sausage meat, mustard sauce",
          price: 8.99,
          category: "all-day-menu",
          subCategory: "starters",
          image:
            "https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
          allergens: ["eggs", "gluten"],
        },
        {
          id: "starter-2",
          name: "Soup of the Day",
          description: "Freshly made soup with crusty bread",
          price: 6.99,
          category: "all-day-menu",
          subCategory: "starters",
          image:
            "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
      ],
    },
    // Seasonal Specials
    {
      id: "seasonal-specials",
      name: "Seasonal Specials",
      description: "Dishes featuring the best seasonal ingredients",
      items: [
        {
          id: "seasonal-1",
          name: "Summer BBQ Platter",
          description: "Selection of grilled meats, corn on the cob, coleslaw",
          price: 22.99,
          category: "seasonal-specials",
          subCategory: "mains",
          image:
            "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: true,
          isPearsonFamous: false,
          allergens: ["mustard"],
        },
        {
          id: "seasonal-2",
          name: "Garden Salad Bowl",
          description:
            "Fresh seasonal vegetables, mixed leaves, house dressing",
          price: 12.99,
          category: "seasonal-specials",
          subCategory: "mains",
          image:
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
          dietaryInfo: {
            isVegetarian: true,
            isVegan: true,
            isGlutenFree: true,
          },
        },
      ],
    },
    // Starters
    {
      id: "starters",
      name: "Starters",
      description: "Appetizers and small plates to start your meal.",
      items: [
        {
          id: "fries",
          name: "French Fries",
          description: "Crispy golden fries. Add gravy $1.99",
          price: 7.99,
          subCategory: "sides",
          category: "starters",
          image:
            "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "sweet-potato-fries",
          name: "Sweet Potato Fries",
          description:
            "Sweet, crispy and golden brown. Served with chipotle mayo.",
          price: 9.99,
          subCategory: "sides",
          category: "starters",
          image:
            "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "onion-rings",
          name: "Onion Rings",
          description: "Battered onion rings cooked to a crispy golden brown.",
          price: 9.99,
          subCategory: "sides",
          category: "starters",
          image:
            "https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "veggies-dip",
          name: "Veggies & Dip",
          description: "A variety of fresh vegetables served with dill dip.",
          price: 9.99,
          subCategory: "sides",
          category: "starters",
          image:
            "https://images.unsplash.com/photo-1605808138185-fafac87b2f7b?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "spring-rolls",
          name: "Vegetable Spring Rolls",
          description: "Served with Sweet Chili sauce.",
          price: 9.99,
          subCategory: "sides",
          category: "starters",
          image:
            "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "samosas",
          name: "Spicy Vegetable Samosas",
          description: "Served with Sweet Chili sauce.",
          price: 9.99,
          subCategory: "sides",
          category: "starters",
          image:
            "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "cauliflower",
          name: "Crispy Breaded Cauliflower",
          description:
            "Deep fried to a crispy golden brown. Served with chipotle mayo.",
          price: 10.99,
          subCategory: "sides",
          category: "starters",
          image:
            "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "pickles",
          name: "Breaded Pickles",
          description:
            "Breaded pickle spears deep fried and served with ranch dip.",
          price: 10.99,
          subCategory: "sides",
          category: "starters",
          image:
            "https://images.unsplash.com/photo-1568096889942-6eedde686635?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "mozzarella-sticks",
          name: "Mozzarella Sticks",
          description:
            "Breaded Mozzarella, deep fried with marinara sauce for dipping.",
          price: 10.99,
          subCategory: "sides",
          category: "starters",
          image:
            "https://images.unsplash.com/photo-1548340748-6d2b7d7da280?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "jalapeno-poppers",
          name: "Jalapeno Poppers",
          description:
            "Breaded jalapenos stuffed with cream cheese and fried to a golden brown. Served with ranch.",
          price: 11.99,
          subCategory: "sides",
          category: "starters",
          image:
            "https://images.unsplash.com/photo-1625937329152-ad86319c3328?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "potato-skins",
          name: "Potato Skins",
          description:
            "Spud shells loaded with bacon and cheese. Served with sour cream.",
          price: 10.99,
          subCategory: "sides",
          category: "starters",
          image:
            "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "popcorn-chicken",
          name: "Popcorn Chicken",
          description:
            "Popcorn sized breaded chicken served with dip or sauce of your choice.",
          price: 11.99,
          subCategory: "sides",
          category: "starters",
          image:
            "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "boneless-chicken-bites",
          name: "Boneless Chicken Bites",
          description:
            "Breaded white meat with your choice of sauce, served with celery and carrot sticks.",
          price: 13.99,
          subCategory: "sides",
          category: "starters",
          image:
            "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "fish-tacos",
          name: "Fish Tacos",
          description:
            "Guacamole, lettuce, pico de gallo and fish with chipotle lime sour cream.",
          price: 10.99,
          subCategory: "sides",
          category: "starters",
          image:
            "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "crab-cakes",
          name: "Crab Cakes",
          description: "2 pieces served with chipotle mayo.",
          price: 9.99,
          subCategory: "sides",
          category: "starters",
          image:
            "https://images.unsplash.com/photo-1559847844-d721426d6edc?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "calamari",
          name: "Crisp & Spicy Calamari",
          description:
            "Fresh squid, onions, sweet peppers and jalapenos tossed in seasoned flour and flash fried. Served with chipotle mayo.",
          price: 12.99,
          subCategory: "sides",
          category: "starters",
          image:
            "https://images.unsplash.com/photo-1559847844-5bfd9c5e4e06?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "coconut-shrimp",
          name: "Coconut Shrimp",
          description: "Served with sweet chili sauce.",
          price: 11.99,
          subCategory: "sides",
          category: "starters",
          image:
            "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "perogies",
          name: "Perogies",
          description:
            "Pasta pockets filled with potato & cheese, topped with Cajun spice, sauteed onions & bacon bits. Served with sour cream.",
          price: 10.99,
          subCategory: "sides",
          category: "starters",
          image:
            "https://images.unsplash.com/photo-1584896326686-88a9d5b7a7bb?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
      ],
    },
    // Breads
    {
      id: "breads",
      name: "Breads",
      description: "Freshly baked breads and toasts.",
      items: [
        {
          id: "bruschetta",
          name: "Bruschetta",
          description:
            "Diced tomato, spices & olive oil on a demi baguette. Topped with balsamic glaze.",
          price: 9.49,
          subCategory: "",
          category: "breads",
          image:
            "https://images.unsplash.com/photo-1506280754576-f6fa8a873550?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "fully-loaded-bread",
          name: "Fully Loaded Bread",
          description:
            "Diced tomato, spices & olive oil, jalapenos, bacon bits, mixed cheese and feta on a demi baguette. Topped with balsamic glaze.",
          price: 12.49,
          subCategory: "",
          category: "breads",
          image:
            "https://images.unsplash.com/photo-1549231319-e0fa7fd38401?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "garlic-bread",
          name: "Garlic Bread",
          description: "Demi baguette with garlic butter, toasted just right.",
          price: 6.99,
          subCategory: "",
          category: "breads",
          image:
            "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "garlic-bread-cheese",
          name: "Garlic Bread with Cheese",
          description: "Garlic bread with cheese.",
          price: 9.99,
          subCategory: "",
          category: "breads",
          image:
            "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "garlic-bread-cheese-bacon",
          name: "Garlic Bread with Cheese & Bacon",
          description: "Garlic bread with cheese & bacon.",
          price: 10.99,
          subCategory: "",
          category: "breads",
          image:
            "https://images.unsplash.com/photo-1619985632461-f33748ef8fdc?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
      ],
    },
    // Poutines
    {
      id: "poutines",
      name: "Poutines",
      description: "Classic and specialty poutines.",
      items: [
        {
          id: "classic-poutine",
          name: "Classic Poutine",
          description:
            "Crispy fries with melted cheese curds and housemade beef gravy.",
          price: 11.99,
          subCategory: "",
          category: "poutines",
          image:
            "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "buffalo-chicken-poutine",
          name: "Buffalo Chicken Poutine",
          description:
            "Crispy fries topped with crispy chicken tenders tossed in hot sauce, cheese curds and beef gravy. Finished with Ranch drizzle.",
          price: 14.49,
          subCategory: "",
          category: "poutines",
          image:
            "https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "butter-chicken-poutine",
          name: "Butter Chicken Poutine",
          description:
            "Delicious, mildly spicy butter chicken, served over cheese curds and crispy french fries.",
          price: 14.49,
          subCategory: "",
          category: "poutines",
          image:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
      ],
    },
    // Nachos
    {
      id: "nachos",
      name: "Nachos",
      description: "Loaded nachos with a variety of toppings.",
      items: [
        {
          id: "pearson-classic-nachos",
          name: "Pearson Classic Nachos",
          description:
            "Tri-coloured tortilla chips topped with bell peppers, onion, tomatoes, jalapenos and black olives. Finished in the oven with marble cheese.",
          price: 19.99,
          subCategory: "",
          category: "nachos",
          image:
            "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "irish-nachos",
          name: "Irish Nachos",
          description:
            "Crispy lattice fries topped with marble cheese, bacon and green onion. Drizzled with sour cream.",
          price: 14.99,
          subCategory: "",
          category: "nachos",
          image:
            "https://images.unsplash.com/photo-1582169296591-ffde83f4d899?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "add-chicken-beef",
          name: "Add Chicken or Beef",
          description: "Add Chicken or Beef to any nachos.",
          price: 5.0,
          subCategory: "",
          category: "nachos",
          image:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
      ],
    },
    // Salads
    {
      id: "salads",
      name: "Salads",
      description: "Fresh salads with a variety of dressings.",
      items: [
        {
          id: "caesar-salad",
          name: "Caesar Salad",
          description:
            "Crisp Romaine lettuce tossed with Caesar dressing, topped with croutons, bacon and Parmesan cheese.",
          price: 9.99,
          subCategory: "small",
          category: "salads",
          image:
            "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "caesar-salad-large",
          name: "Caesar Salad (Large)",
          description:
            "Crisp Romaine lettuce tossed with Caesar dressing, topped with croutons, bacon and Parmesan cheese.",
          price: 11.99,
          subCategory: "large",
          category: "salads",
          image:
            "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "greek-salad",
          name: "Greek Salad",
          description:
            "Fresh Iceberg lettuce with mixed peppers, cucumbers, red onions, tomatoes, olives and Feta cheese. Served with Greek dressing.",
          price: 9.99,
          subCategory: "small",
          category: "salads",
          image:
            "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "greek-salad-large",
          name: "Greek Salad (Large)",
          description:
            "Fresh Iceberg lettuce with mixed peppers, cucumbers, red onions, tomatoes, olives and Feta cheese. Served with Greek dressing.",
          price: 11.99,
          subCategory: "large",
          category: "salads",
          image:
            "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "house-salad",
          name: "House Salad",
          description:
            "Fresh mixed greens with cucumber, tomato, bermuda onion, julienne carrots and your choice of dressing.",
          price: 7.99,
          subCategory: "small",
          category: "salads",
          image:
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "house-salad-large",
          name: "House Salad (Large)",
          description:
            "Fresh mixed greens with cucumber, tomato, bermuda onion, julienne carrots and your choice of dressing.",
          price: 9.99,
          subCategory: "large",
          category: "salads",
          image:
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "add-chicken-salad",
          name: "Add Chicken to Salad",
          description: "Add Chicken to any salad.",
          price: 5.0,
          subCategory: "",
          category: "salads",
          image:
            "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
      ],
    },
    // Wraps
    {
      id: "wraps",
      name: "Wraps",
      description: "Tasty wraps served with fries or house salad.",
      items: [
        {
          id: "chicken-club-wrap",
          name: "Chicken Club Wrap",
          description:
            "Lightly seasoned chicken breast with lettuce, tomato, cheese, bacon and mayo.",
          price: 16.99,
          subCategory: "",
          category: "wraps",
          image:
            "https://images.unsplash.com/photo-1604909612924-3a7f3e6f3f3b?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "buffalo-chicken-wrap",
          name: "Buffalo Chicken Wrap",
          description:
            "Breaded B.B.Q. tender chicken, lettuce, tomatoes and chipotle mayo.",
          price: 16.99,
          subCategory: "",
          category: "wraps",
          image:
            "https://images.unsplash.com/photo-1604909612924-3a7f3e6f3f3b?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "mediterranean-wrap",
          name: "Mediterranean Wrap",
          description:
            "Lightly seasoned chicken breast with feta cheese, lettuce, tomato, olives and tzatziki sauce.",
          price: 16.99,
          subCategory: "",
          category: "wraps",
          image:
            "https://images.unsplash.com/photo-1604909612924-3a7f3e6f3f3b?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "chicken-caesar-wrap",
          name: "Chicken Caesar Wrap",
          description:
            "Grilled Chicken, romaine lettuce, croutons, bacon and Parmesan cheese with Caesar dressing.",
          price: 16.99,
          subCategory: "",
          category: "wraps",
          image:
            "https://images.unsplash.com/photo-1604909612924-3a7f3e6f3f3b?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "fajita-chicken-wrap",
          name: "Fajita Chicken Wrap",
          description:
            "Thinly sliced chicken, sweet bell peppers, onions and mixed cheese. Served with Salsa & Sour cream.",
          price: 16.99,
          subCategory: "",
          category: "wraps",
          image:
            "https://images.unsplash.com/photo-1604909612924-3a7f3e6f3f3b?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
      ],
    },
    // Sandwiches
    {
      id: "sandwiches",
      name: "Sandwiches",
      description:
        "Classic and specialty sandwiches served with fries or house salad.",
      items: [
        {
          id: "steak-sandwich",
          name: "Steak Sandwich",
          description:
            "6oz steak grilled just the way you like with sauteed mushrooms & onions on a toasted demi baguette.",
          price: 19.99,
          subCategory: "",
          category: "sandwiches",
          image:
            "https://images.unsplash.com/photo-1604909612924-3a7f3e6f3f3b?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "philly-melt",
          name: "Philly Melt",
          description:
            "Thinly sliced roast beef with sauteed onions, peppers and Swiss cheese. Served on a toasted demi baguette.",
          price: 16.99,
          subCategory: "",
          category: "sandwiches",
          image:
            "https://images.unsplash.com/photo-1604909612924-3a7f3e6f3f3b?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "reuben",
          name: "Reuben",
          description:
            "Tender corned beef served on rye bread, brushed with your choice of mustard or 1000 island dressing, smothered with Swiss cheese & sauerkraut.",
          price: 15.99,
          subCategory: "",
          category: "sandwiches",
          image:
            "https://images.unsplash.com/photo-1604909612924-3a7f3e6f3f3b?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "fried-chicken-sandwich",
          name: "Fried Chicken Sandwich",
          description:
            "White meat chicken breast coated in our very own homestyle breading with lettuce, tomato and chipotle mayo on a Brioche bun.",
          price: 14.99,
          subCategory: "",
          category: "sandwiches",
          image:
            "https://images.unsplash.com/photo-1604909612924-3a7f3e6f3f3b?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "grilled-cheese",
          name: "Grilled Cheese",
          description:
            "Cheddar & Swiss cheese between 3 slices of homestyle white or whole wheat bread.",
          price: 10.99,
          subCategory: "",
          category: "sandwiches",
          image:
            "https://images.unsplash.com/photo-1604909612924-3a7f3e6f3f3b?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "add-bacon-grilled-tomato",
          name: "Add Bacon & grilled tomato",
          description: "Add Bacon & grilled tomato to Grilled Cheese.",
          price: 3.99,
          subCategory: "",
          category: "sandwiches",
          image:
            "https://images.unsplash.com/photo-1604909612924-3a7f3e6f3f3b?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "hot-beef-dip",
          name: "Hot Beef Dip",
          description:
            "Thinly sliced roast beef with Swiss cheese and fried onions piled on a freshly toasted demi baguette. Served with Au Jus.",
          price: 15.99,
          subCategory: "",
          category: "sandwiches",
          image:
            "https://images.unsplash.com/photo-1604909612924-3a7f3e6f3f3b?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "pulled-pork-sandwich",
          name: "Pulled Pork Sandwich",
          description:
            "A demi baguette bun loaded with our Bbq pulled pork, melted Marble cheese and crispy onion.",
          price: 14.99,
          subCategory: "",
          category: "sandwiches",
          image:
            "https://images.unsplash.com/photo-1604909612924-3a7f3e6f3f3b?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "blt",
          name: "BLT",
          description:
            "Bacon, lettuce, tomato and mayo on white or brown bread toasted lightly.",
          price: 10.99,
          subCategory: "",
          category: "sandwiches",
          image:
            "https://images.unsplash.com/photo-1604909612924-3a7f3e6f3f3b?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "clubhouse",
          name: "Pearson's Chicken Clubhouse",
          description:
            "Tender grilled chicken breast topped with bacon, lettuce, tomato and mayo. Served on whole wheat or white bread.",
          price: 14.99,
          subCategory: "",
          category: "sandwiches",
          image:
            "https://images.unsplash.com/photo-1604909612924-3a7f3e6f3f3b?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "fried-chicken-sandwich-2",
          name: "Fried Chicken Sandwich",
          description:
            "White meat chicken breast coated in our very own homestyle breading with lettuce, tomato and chipotle mayo on a Brioche bun.",
          price: 14.99,
          subCategory: "",
          category: "sandwiches",
          image:
            "https://images.unsplash.com/photo-1604909612924-3a7f3e6f3f3b?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
      ],
    },
    // Burgers
    {
      id: "burgers",
      name: "Burgers",
      description: "All burgers are served with fries or house salad.",
      items: [
        {
          id: "house-burger",
          name: "House Burger",
          description:
            "Housemade beef burger, served on a toasted kaiser with lettuce, onion, tomato and pickle.",
          price: 12.99,
          subCategory: "",
          category: "burgers",
          image:
            "https://images.unsplash.com/photo-1604909612924-3a7f3e6f3f3b?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "mushroom-swiss-burger",
          name: "Mushroom & Swiss Burger",
          description:
            "Topped with sauteed mushrooms and Swiss Cheese. Garnished with lettuce, tomato, onion and pickle.",
          price: 15.99,
          subCategory: "",
          category: "burgers",
          image:
            "https://images.unsplash.com/photo-1604909612924-3a7f3e6f3f3b?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "cheddar-bacon-burger",
          name: "Cheddar Bacon Burger",
          description:
            "Crispy bacon and Cheddar cheese garnished with lettuce, tomato, onion and pickle.",
          price: 15.99,
          subCategory: "",
          category: "burgers",
          image:
            "https://images.unsplash.com/photo-1604909612924-3a7f3e6f3f3b?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "pearson-burger",
          name: "The Pearson Burger",
          description:
            "Bourbon Chipotle caramelized onions with crispy bacon, Cheddar cheese, lettuce, onion, tomato and pickle.",
          price: 16.99,
          subCategory: "",
          category: "burgers",
          image:
            "https://images.unsplash.com/photo-1604909612924-3a7f3e6f3f3b?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "veggie-burger",
          name: "Veggie Burger",
          description:
            "Grilled black beans burger topped with Guacamole and Pico de Gallo.",
          price: 13.99,
          subCategory: "",
          category: "burgers",
          image:
            "https://images.unsplash.com/photo-1604909612924-3a7f3e6f3f3b?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
      ],
    },
    // Favourite Mains
    {
      id: "favourite-mains",
      name: "Favourite Mains",
      description: "Classic pub mains and hearty entrees.",
      items: [
        {
          id: "shepherds-pie",
          name: "Shephards Pie",
          description:
            "Seasoned ground beef, carrots celery, peas and corn simmered in our rich gravy, topped with creamy mashed potato. Served with vegetables and a side of gravy.",
          price: 18.99,
          subCategory: "",
          category: "favourite-mains",
          image:
            "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "bangers-beans-mashed",
          name: "Bangers, Beans & Mashed",
          description:
            "Grilled country pork sausage served with mashed potatoes, baked beans and sauteed onions.",
          price: 16.99,
          subCategory: "",
          category: "favourite-mains",
          image:
            "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "liver-bacon-onions",
          name: "Liver, Bacon & Onions",
          description:
            "Pan seared beef liver served with mashed potatoes and vegetables, topped with sauteed onion, bacon and beef gravy.",
          price: 17.99,
          subCategory: "",
          category: "favourite-mains",
          image:
            "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "fish-n-chips",
          name: "Fish N Chips",
          description:
            "Homemade beer battered haddock fillet served with tartar sauce, coleslaw & fries.",
          price: 15.99,
          subCategory: "",
          category: "favourite-mains",
          image:
            "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: true,
        },
        {
          id: "castelli-romani-steak",
          name: "Castelli Romani Steak",
          description:
            "10 oz strip loin steak grilled to perfection with mushroom gravy, sauteed vegetables and mashed potatoes.",
          price: 28.99,
          subCategory: "",
          category: "favourite-mains",
          image:
            "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: true,
          isPearsonFamous: false,
        },
        {
          id: "chicken-souvlaki",
          name: "Chicken Souvlaki",
          description:
            "Two skewers of grilled chicken served with basmati rice, greek salad and tzatziki sauce.",
          price: 18.99,
          subCategory: "",
          category: "favourite-mains",
          image:
            "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "waffle-chicken",
          name: "Waffle & Chicken",
          description:
            "Belgium waffle topped with our homestyle breaded chicken breast & our housemade glaze. Served with vegetables and wedges.",
          price: 18.99,
          subCategory: "",
          category: "favourite-mains",
          image:
            "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "chicken-fingers",
          name: "Chicken Fingers",
          description:
            "Lightly breaded chicken fingers and french fries served with plum sauce.",
          price: 13.99,
          subCategory: "",
          category: "favourite-mains",
          image:
            "https://images.unsplash.com/photo-1627662168223-7df99068099a?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "chicken-quesadilla",
          name: "Chicken Quesadilla",
          description:
            "A soft tortilla stuffed with grilled chicken, sweet peppers, tomatoes, onion and mixed cheese. Served with house salad, salsa & sour cream.",
          price: 15.99,
          subCategory: "",
          category: "favourite-mains",
          image:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "pork-schnitzel",
          name: "Pork Schnitzel",
          description:
            "Finished with a creamy mushroom sauce and served with mashed potatoes and vegetables.",
          price: 18.99,
          subCategory: "",
          category: "favourite-mains",
          image:
            "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
      ],
    },
    // Curries
    {
      id: "curries",
      name: "Curries",
      description: "House-made curries served with rice and naan.",
      items: [
        {
          id: "butter-chicken",
          name: "Butter Chicken",
          description:
            "Tender chicken and peppers simmered in a velvety sauce made from butter, tomatoes, cream and spices. Served with basmati rice and garnished with cilantro.",
          price: 18.99,
          subCategory: "",
          category: "curries",
          image:
            "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: true,
        },
        {
          id: "pearsons-curried-chicken",
          name: "Pearson’s Curried Chicken",
          description:
            "Our chef’s own style curry, with chicken, peppers and potato served with basmati rice and Naan bread.",
          price: 18.99,
          subCategory: "",
          category: "curries",
          image:
            "https://images.unsplash.com/photo-1512990414788-d97cb4a25db3?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: true,
        },
      ],
    },
    // Pasta
    {
      id: "pasta",
      name: "Pasta",
      description: "All pastas are served with garlic bread.",
      items: [
        {
          id: "penne-toscana",
          name: "Penne Toscana",
          description:
            "Italian sausage, bacon, broccoli and mushrooms in a creamy tomato pesto sauce.",
          price: 15.99,
          subCategory: "",
          category: "pasta",
          image:
            "https://images.unsplash.com/photo-1563379091339-03246963d725?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "spinach-cheese-ravioli",
          name: "Spinach & Cheese Ravioli",
          description:
            "Ravioli stuffed with spinach and Ricotta cheese with sweet peppers and onions in a rose sauce.",
          price: 13.99,
          subCategory: "",
          category: "pasta",
          image:
            "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "spaghetti-meat-sauce",
          name: "Spaghetti Meat Sauce",
          description: "Homemade meat sauce tossed with spaghetti pasta.",
          price: 15.99,
          subCategory: "",
          category: "pasta",
          image:
            "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "chicken-parmesan",
          name: "Chicken Parmesan",
          description:
            "Tender breaded chicken served over spaghetti noodles with a tomato basil sauce.",
          price: 17.99,
          subCategory: "",
          category: "pasta",
          image:
            "https://images.unsplash.com/photo-1572441713132-51c75654db73?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "chicken-fettuccine-alfredo",
          name: "Chicken Fettuccine Alfredo",
          description:
            "Grilled chicken, mushroom and fettuccini pasta tossed in our creamy alfredo sauce.",
          price: 15.99,
          subCategory: "",
          category: "pasta",
          image:
            "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
      ],
    },
    // Kid's Meals
    {
      id: "kids-meals",
      name: "Kid's Meals",
      description: "Child-friendly portions and favorites.",
      items: [
        {
          id: "kids-penne-butter",
          name: "Kid's Penne Butter",
          description: "Simple buttered penne pasta.",
          price: 6.99,
          subCategory: "",
          category: "kids-meals",
          image:
            "https://images.unsplash.com/photo-1563379091339-03246963d725?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "kids-fingers-fries",
          name: "Kid's Fingers & Fries",
          description: "Chicken fingers with crispy fries.",
          price: 6.99,
          subCategory: "",
          category: "kids-meals",
          image:
            "https://images.unsplash.com/photo-1627662168223-7df99068099a?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "kids-quesadilla-fries",
          name: "Kid's Quesadilla & Fries",
          description: "Cheese quesadilla with fries.",
          price: 6.99,
          subCategory: "",
          category: "kids-meals",
          image:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "kids-wings-fries",
          name: "Kid's Wings & Fries",
          description: "Mild chicken wings with fries.",
          price: 6.99,
          subCategory: "",
          category: "kids-meals",
          image:
            "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "kids-grilled-cheese-fries",
          name: "Kid's Grilled Cheese & Fries",
          description: "Classic grilled cheese with fries.",
          price: 6.99,
          subCategory: "",
          category: "kids-meals",
          image:
            "https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
      ],
    }, // Desserts
    {
      id: "desserts",
      name: "Desserts",
      description: "Sweet treats to end your meal.",
      items: [
        {
          id: "apple-crumble",
          name: "Apple Crumble",
          description: "Warm apple crumble with vanilla ice cream.",
          price: 6.99,
          subCategory: "",
          category: "desserts",
          image:
            "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "ny-cheesecake",
          name: "New York Cheesecake",
          description: "Rich cheesecake with strawberry sauce.",
          price: 6.99,
          subCategory: "",
          category: "desserts",
          image:
            "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "triple-chocolate-brownie",
          name: "Triple Chocolate Brownie",
          description: "Decadent chocolate brownie with ice cream.",
          price: 6.99,
          subCategory: "",
          category: "desserts",
          image:
            "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "sticky-toffee-pudding-cake",
          name: "Sticky Toffee Pudding Cake",
          description: "Traditional sticky toffee pudding with warm sauce.",
          price: 6.99,
          subCategory: "",
          category: "desserts",
          image:
            "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
      ],
    }, // Beverages
    {
      id: "beverages",
      name: "Beverages",
      description: "Refreshing drinks and soft beverages.",
      items: [
        {
          id: "pepsi",
          name: "Pepsi",
          description: "Classic cola drink.",
          price: 2.99,
          category: "beverages",
          subCategory: "soft-drinks",
          image:
            "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "diet-pepsi",
          name: "Diet Pepsi",
          description: "Diet cola with zero calories.",
          price: 2.99,
          category: "beverages",
          subCategory: "soft-drinks",
          image:
            "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "nestea",
          name: "Nestea Iced Tea",
          description: "Refreshing iced tea.",
          price: 2.99,
          category: "beverages",
          subCategory: "soft-drinks",
          image:
            "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "7up",
          name: "7Up",
          description: "Lemon-lime soda.",
          price: 2.99,
          category: "beverages",
          subCategory: "soft-drinks",
          image:
            "https://images.unsplash.com/photo-1624726175512-e4ee8fdee15d?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "apple-juice",
          name: "Apple Juice",
          description: "Fresh apple juice.",
          price: 2.99,
          category: "beverages",
          subCategory: "soft-drinks",
          image:
            "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "orange-juice",
          name: "Orange Juice",
          description: "Fresh orange juice.",
          price: 2.99,
          category: "beverages",
          subCategory: "soft-drinks",
          image:
            "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
      ],
    },
    // Beer
    {
      id: "beer",
      name: "Beer",
      description: "Selection of draft and bottled beers.",
      items: [
        {
          id: "tallcans",
          name: "Tallcans",
          description:
            "Canadian, Coors Light, Budweiser, Bud Light, Blue, Strongbow, Michelob Ultra",
          price: 5.99,
          subCategory: "",
          category: "beer",
          image:
            "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "bottles",
          name: "Bottles",
          description:
            "Budweiser, Bud Light, Canadian, Coors Light, Blue, Blue Light, Export, Stella, Kieth’s Ipa, Heineken, Mgd, Bud Light Lime, Moosehead, Corona, Steam Whistle",
          category: "beer",
          price: 5.49,
          subCategory: "",
          image:
            "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
      ],
    }, // Coolers
    {
      id: "coolers",
      name: "Coolers",
      description: "Refreshing alcoholic coolers and flavored drinks.",
      items: [
        {
          id: "bacardi-breezer-orange",
          name: "Bacardi Breezer Orange",
          description: "Orange flavored rum cooler.",
          price: 4.99,
          subCategory: "",
          category: "coolers",
          image:
            "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "palm-bay-strawberry-pineapple",
          name: "Palm Bay Strawberry Pineapple",
          description: "Tropical strawberry pineapple cooler.",
          price: 4.99,
          subCategory: "",
          category: "coolers",
          image:
            "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "smirnoff-ice-original",
          name: "Smirnoff Ice Original",
          description: "Classic vodka cooler.",
          price: 4.99,
          subCategory: "",
          category: "coolers",
          image:
            "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "smirnoff-ice-berry-blast",
          name: "Smirnoff Ice Berry Blast",
          description: "Berry flavored vodka cooler.",
          price: 4.99,
          subCategory: "",
          category: "coolers",
          image:
            "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
      ],
    },
    // Wine
    {
      id: "wine",
      name: "Wine",
      description: "Curated selection of red and white wines.",
      items: [
        {
          id: "jacobs-creek",
          name: "Jacob's Creek (Shiraz)",
          description: "Rich red wine with bold flavors.",
          price: 8.99,
          subCategory: "reds",
          category: "wine",
          image:
            "https://images.unsplash.com/photo-1546537176-de251c4db602?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "two-oceans",
          name: "Two Oceans (Cabernet Merlot)",
          description: "Smooth red wine blend.",
          price: 8.99,
          subCategory: "reds",
          category: "wine",
          image:
            "https://images.unsplash.com/photo-1546537176-de251c4db602?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "jackson-triggs",
          name: "Jackson Triggs (Cabernet Sauvignon)",
          description: "Full-bodied red wine.",
          price: 9.99,
          subCategory: "reds",
          category: "wine",
          image:
            "https://images.unsplash.com/photo-1546537176-de251c4db602?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "graffigna",
          name: "Graffigna (Pinot Grigio)",
          description: "Crisp white wine with citrus notes.",
          price: 8.99,
          subCategory: "whites",
          category: "wine",
          image:
            "https://images.unsplash.com/photo-1560148803-c5f6a6b4137e?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "fuzion",
          name: "Fuzion (Chardonnay)",
          description: "Smooth white wine with oak notes.",
          price: 8.99,
          subCategory: "whites",
          category: "wine",
          image:
            "https://images.unsplash.com/photo-1560148803-c5f6a6b4137e?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
        {
          id: "fontana-di-papa",
          name: "Fontana Di Papa (Blend)",
          description: "Balanced white wine blend.",
          price: 8.99,
          subCategory: "whites",
          category: "wine",
          image:
            "https://images.unsplash.com/photo-1560148803-c5f6a6b4137e?auto=format&fit=crop&w=600&q=80",
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
      ],
    },
  ]);

  const getFeaturedItems = computed(() => {
    return menuCategories.value
      .flatMap((category) => category.items)
      .filter((item) => item.isFeatured);
  });

  const getPearsonFamousItems = computed(() => {
    return menuCategories.value
      .flatMap((category) => category.items)
      .filter((item) => item.isPearsonFamous);
  });

  const getItemsByCategory = (categoryId: string) => {
    const category = menuCategories.value.find((c) => c.id === categoryId);
    return category?.items || [];
  };
  const getPrimaryCategories = computed(() => {
    return menuCategories.value.filter((category) =>
      ["daily-specials", "all-day-menu", "seasonal-specials"].includes(
        category.id
      )
    );
  });

  const getSecondaryCategories = computed(() => {
    return menuCategories.value.filter(
      (category) =>
        !["daily-specials", "all-day-menu", "seasonal-specials"].includes(
          category.id
        )
    );
  });
  const searchItems = (query: string) => {
    if (!query.trim()) return [];

    const searchTerm = query.toLowerCase();
    return menuCategories.value
      .flatMap((category) =>
        category.items.map((item) => ({ ...item, categoryName: category.name }))
      )
      .filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm) ||
          item.description?.toLowerCase().includes(searchTerm) ||
          item.categoryName.toLowerCase().includes(searchTerm)
      );
  };

  return {
    menuCategories,
    getFeaturedItems,
    getPearsonFamousItems,
    getItemsByCategory,
    getPrimaryCategories,
    getSecondaryCategories,
    searchItems,
  };
};
