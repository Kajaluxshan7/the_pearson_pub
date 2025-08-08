export default defineEventHandler(async (event) => {
  try {
    // Simulate health check
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      service: "frontend",
      version: "1.0.0",
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Service Unavailable",
    });
  }
});
