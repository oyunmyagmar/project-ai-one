// import React, { useEffect, useState } from "react";
// import { TabsContent } from "@/components/ui";
// import { getTopRatedMovies } from "@/lib/utils/get-mov-data";
// import { MovieResponseType } from "@/lib/types";

// export const Video = () => {
//   const [movies, setMovies] = useState();

//   const getMovies = async () => {
//     const topRatedMovies: MovieResponseType = await getTopRatedMovies();
//   };
//   useEffect(() => {
//     getMovies();
//   }, []);

//   return (
//     <div>
//       <TabsContent value="Image analysis" className="w-145">
//         {}
//         <div>
//           <div></div>
//         </div>
//       </TabsContent>
//     </div>
//   );
// };
