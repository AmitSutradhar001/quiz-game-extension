export async function fetchSiteData(data) {
  try {
    const response = await fetch("http://localhost:3000/siteData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: data }),
    });

    const siteData = await response.json();
    localStorage.setItem("siteData", JSON.stringify(siteData));

    console.log("siteData chunks saved to local storage.");
  } catch (error) {
    console.error("Error fetching siteData from server:", error);
  }
}
