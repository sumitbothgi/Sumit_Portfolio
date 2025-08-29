// // Certificates.jsx
// import { Card, CardContent } from "@/components/ui/card";
// import { Award } from "lucide-react";

// export default function Certificates() {
//   const certificates = [
//     {
//       title: "Java Programming",
//       issuer: "Coursera",
//       year: "2024",
//     },
//     {
//       title: "React.js Frontend Development",
//       issuer: "Udemy",
//       year: "2025",
//     },
//     {
//       title: "SQL & Database Management",
//       issuer: "Great Learning",
//       year: "2024",
//     },
//   ];

//   return (
//     <section id="certificates" className="py-12 px-6 md:px-16 bg-black text-white">
//       <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
//         <Award className="w-8 h-8 text-purple-400" />
//         Certificates
//       </h2>

//       <div className="grid md:grid-cols-3 gap-6">
//         {certificates.map((cert, index) => (
//           <Card
//             key={index}
//             className="bg-gray-900 border border-gray-700 rounded-2xl shadow-md hover:shadow-lg transition-transform hover:scale-105"
//           >
//             <CardContent className="p-6">
//               <h3 className="text-xl font-semibold mb-2">{cert.title}</h3>
//               <p className="text-gray-400">{cert.issuer}</p>
//               <p className="text-sm text-gray-500">{cert.year}</p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </section>
//   );
// }
