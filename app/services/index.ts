export const getProductData = async (slug: string) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const apiUrl = `${API_URL}/api/products/${slug}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseJson = await response.json();

    if (!response.ok) {
      throw (
        responseJson?.error || "Something went wrong! Please try again later."
      );
    }

    return responseJson;
  } catch (err) {
    console.log("Error fetching product data!", err);
    throw { message: err instanceof Error ? err.message : String(err) };
  }
};
