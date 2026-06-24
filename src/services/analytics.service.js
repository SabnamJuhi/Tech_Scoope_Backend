
// exports.getSalesAnalytics = async (page, limit) => {
//   const response = await fetch(
//     `${process.env.ANALYTICS_URL}?page=${page}&limit=${limit}`
//   );

//   if (!response.ok) {
//     throw new Error("Failed to fetch analytics data");
//   }

//   return await response.json();
// };



exports.getSalesAnalytics = async (page, limit) => {

  const total = 100;

  const data = Array.from(
    { length: limit },
    (_, i) => ({
      month: `Month ${((page - 1) * limit) + i + 1}`,
      sales: Math.floor(Math.random() * 10000)
    })
  );

  return {
    total,
    page,
    limit,
    data
  };
};