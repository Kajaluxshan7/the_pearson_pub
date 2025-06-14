import { ref, computed } from "vue";
import type { MenuItem, MenuCategory } from "~/types/menu";

export const useMenu = () => {
  const menuCategories = ref<MenuCategory[]>([
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
          image: "/images/food/daily-catch.jpg",
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
          isAvailable: true,
          isVisible: true,
          isFeatured: true,
          isPearsonFamous: false,
        },
      ],
    },
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
          image: "/images/food/fish-chips.jpg",
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
          image: "/images/food/steak-pie.jpg",
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
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          isPearsonFamous: false,
        },
      ],
    },
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
          image: "/images/food/bbq-platter.jpg",
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

  return {
    menuCategories,
    getFeaturedItems,
    getPearsonFamousItems,
    getItemsByCategory,
  };
};
