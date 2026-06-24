// // exports.getSalesAnalytics =
// //   async (req, res) => {
// //     const page =
// //       Number(req.query.page) || 1;

// //     const limit =
// //       Number(req.query.limit) || 10;

// //     const total = 1000;

// //     const data = Array.from(
// //       { length: limit },
// //       (_, index) => ({
// //         date: `2025-01-${index + 1}`,
// //         sales:
// //           Math.floor(
// //             Math.random() * 10000
// //           ),
// //       })
// //     );

// //     res.json({
// //       page,
// //       limit,
// //       total,
// //       data,
// //     });
// //   };

//   const {
//  getSalesAnalytics
// } = require(
//  "../services/analytics.service"
// );



// exports.sales =
//  async(req,res,next)=>{
//    try{

//       const page =
//        req.query.page || 1;

//       const limit =
//        req.query.limit || 10;

//       const data =
//        await getSalesAnalytics(
//           page,
//           limit
//        );

//       res.json(data);

//    }catch(err){
//       next(err);
//    }
// };




const {
  getSalesAnalytics
} = require("../services/analytics.service");

exports.sales = async (req, res, next) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await getSalesAnalytics(
      page,
      limit
    );

    res.status(200).json({
      success: true,
      ...result
    });

  } catch (err) {
    next(err);
  }
};