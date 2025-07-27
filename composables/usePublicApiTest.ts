import { ref, onMounted } from "vue";
import { usePublicApi } from "./usePublicApi";

export const usePublicApiTest = () => {
  const testResults = ref<string[]>([]);
  const isLoading = ref(false);

  const testEndpoints = async () => {
    isLoading.value = true;
    testResults.value = [];

    const { getMenuData, getEventsData, getContactInfo } = usePublicApi();

    try {
      // Test menu endpoint
      console.log("Testing menu endpoint...");
      const menuData = await getMenuData();
      testResults.value.push(
        `✅ Menu API: ${menuData.categories.length} categories, ${menuData.totalItems} items`
      );
    } catch (error) {
      testResults.value.push(`❌ Menu API failed: ${error}`);
      console.error("Menu API error:", error);
    }

    try {
      // Test events endpoint
      console.log("Testing events endpoint...");
      const eventsData = await getEventsData();
      testResults.value.push(
        `✅ Events API: ${eventsData.events.length} events`
      );
    } catch (error) {
      testResults.value.push(`❌ Events API failed: ${error}`);
      console.error("Events API error:", error);
    }

    try {
      // Test contact endpoint
      console.log("Testing contact endpoint...");
      const contactData = await getContactInfo();
      testResults.value.push(
        `✅ Contact API: ${contactData.operationHours.length} operation hours`
      );
    } catch (error) {
      testResults.value.push(`❌ Contact API failed: ${error}`);
      console.error("Contact API error:", error);
    }

    isLoading.value = false;
  };

  return {
    testResults,
    isLoading,
    testEndpoints,
  };
};
