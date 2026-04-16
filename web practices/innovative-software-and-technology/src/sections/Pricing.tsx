// "use client";

// import React, { useState, useEffect } from "react";
// import { pricing as fallbackPricing } from "@/constants";
// import { ShieldCheck, Zap, Loader2 } from "lucide-react";
// import { initiatePayment, fetchPlans } from "@/services/api";

// const PricingCard = ({
//   plan,
//   index
// }: {
//   plan: { title: string; price: string; features: string[] };
//   index: number;
// }) => {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const isPro = plan?.title?.toLowerCase() === "pro";
//   const isEnterprise = plan?.title?.toLowerCase() === "enterprise";

//   const handlePayment = async () => {
//     if (!email || !email.includes("@")) {
//       setError("Please enter a valid email");
//       return;
//     }
//     setLoading(true);
//     setError("");
//     try {
//       const response = await initiatePayment({ email, planTitle: plan.title });
//       if (response?.data?.authorization_url) {
//         window.location.href = response.data.authorization_url;
//       } else {
//         throw new Error("Invalid response from payment provider");
//       }
//     } catch (err: any) {
//       setError(err.message || "Payment initialization failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!plan) return null;

//   return (
//     <div className={`relative flex flex-col w-full max-w-sm p-8 rounded-[2.5rem] border transition-all duration-500 backdrop-blur-md h-full ${
//       isPro ? "bg-slate-900/80 border-blue-500 shadow-2xl scale-105 z-10" : "bg-slate-900/40 border-slate-800"
//     }`}>
//       <div className="mb-8">
//         <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-blue-400">{plan.title}</h3>
//         <div className="flex items-baseline gap-1">
//           <span className="text-4xl font-bold text-white">{plan.price}</span>
//           {!isEnterprise && <span className="text-slate-500">/mo</span>}
//         </div>
//       </div>

//       <ul className="space-y-4 mb-10 flex-grow">
//         {plan.features?.map((feature, idx) => (
//           <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
//             <ShieldCheck size={16} className="text-blue-500 mt-0.5" />
//             {feature}
//           </li>
//         ))}
//       </ul>

//       <div className="mt-auto">
//         {!isEnterprise && (
//           <input
//             type="email"
//             placeholder="Work email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full py-3 px-4 rounded-xl bg-slate-800 border border-slate-700 text-white mb-4 outline-none focus:border-blue-500"
//           />
//         )}
//         {error && <p className="text-red-400 text-xs mb-3">{error}</p>}
//         <button
//           onClick={isEnterprise ? () => window.location.href='#contact' : handlePayment}
//           disabled={loading}
//           className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all ${
//             isPro ? "bg-blue-600 hover:bg-blue-500" : "bg-white text-black hover:bg-slate-200"
//           } disabled:opacity-50`}
//         >
//           {loading ? "Processing..." : isEnterprise ? "Contact Sales" : "Get Started"}
//         </button>
//       </div>
//     </div>
//   );
// };

// const Pricing = () => {
//   const [plans, setPlans] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let isMounted = true;
//     const loadPlans = async () => {
//       try {
//         const response = await fetchPlans();
//         if (isMounted) {
//           if (response?.success && Array.isArray(response.data)) {
//             setPlans(response.data);
//           } else {
//             setPlans(fallbackPricing);
//           }
//         }
//       } catch (err) {
//         if (isMounted) setPlans(fallbackPricing);
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     };
//     loadPlans();
//     return () => { isMounted = false; };
//   }, []);

//   return (
//     <section id="pricing" className="py-24 bg-[#020817]">
//       <div className="container mx-auto px-6">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Scalable Solutions</h2>
//           <p className="text-slate-400 max-w-2xl mx-auto">Choose the tier that aligns with your architectural complexity and business goals.</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
//           {loading ? (
//             <div className="col-span-full flex justify-center py-20">
//               <Loader2 className="animate-spin text-blue-500" size={48} />
//             </div>
//           ) : (
//             plans.map((plan, index) => (
//               <PricingCard key={plan.title || index} plan={plan} index={index} />
//             ))
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Pricing;



"use client";

import React, { useState, useEffect } from "react";
import { pricing as fallbackPricing } from "@/constants";
import { ShieldCheck, Loader2 } from "lucide-react";
import { initiatePayment, fetchPlans } from "@/services/api";

type Plan = {
  title: string;
  price: string;
  features: string[];
};

const PricingCard = ({ plan }: { plan: Plan }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isPro = plan?.title?.toLowerCase() === "pro";
  const isEnterprise = plan?.title?.toLowerCase() === "enterprise";

  const handlePayment = async () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await initiatePayment({
        email,
        planTitle: plan.title,
      });

      if (response?.data?.authorization_url) {
        window.location.href = response.data.authorization_url;
      } else {
        throw new Error("Invalid payment response");
      }
    } catch (err: any) {
      setError(err.message || "Payment initialization failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!plan) return null;

  return (
    <div
      className={`relative flex flex-col w-full max-w-sm p-8 rounded-[2.5rem] border transition-all duration-500 backdrop-blur-md h-full ${
        isPro
          ? "bg-slate-900/80 border-blue-500 shadow-2xl scale-105 z-10"
          : "bg-slate-900/40 border-slate-800"
      }`}
    >
      <div className="mb-8">
        <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-blue-400">
          {plan.title}
        </h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-white">{plan.price}</span>
          {!isEnterprise && <span className="text-slate-500">/mo</span>}
        </div>
      </div>

      <ul className="space-y-4 mb-10 flex-grow">
        {Array.isArray(plan.features) &&
          plan.features.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-sm text-slate-300"
            >
              <ShieldCheck size={16} className="text-blue-500 mt-0.5" />
              {feature}
            </li>
          ))}
      </ul>

      <div className="mt-auto">
        {!isEnterprise && (
          <input
            type="email"
            placeholder="Work email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-3 px-4 rounded-xl bg-slate-800 border border-slate-700 text-white mb-4 outline-none focus:border-blue-500"
          />
        )}

        {error && <p className="text-red-400 text-xs mb-3">{error}</p>}

        <button
          onClick={
            isEnterprise
              ? () => (window.location.href = "#contact")
              : handlePayment
          }
          disabled={loading}
          className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all ${
            isPro
              ? "bg-blue-600 hover:bg-blue-500"
              : "bg-white text-black hover:bg-slate-200"
          } disabled:opacity-50`}
        >
          {loading
            ? "Processing..."
            : isEnterprise
            ? "Contact Sales"
            : "Get Started"}
        </button>
      </div>
    </div>
  );
};

const Pricing = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadPlans = async () => {
      try {
        const response = await fetchPlans();

        if (isMounted) {
          if (Array.isArray(response) && response.length > 0) {
            setPlans(response);
          } else {
            setPlans(fallbackPricing);
          }
        }
      } catch (err) {
        console.error("Failed to fetch plans:", err);
        if (isMounted) setPlans(fallbackPricing);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadPlans();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="pricing" className="py-24 bg-[#020817]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Scalable Solutions
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Choose the tier that aligns with your architectural complexity and business goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {loading ? (
            <div className="col-span-full flex justify-center py-20">
              <Loader2 className="animate-spin text-blue-500" size={48} />
            </div>
          ) : Array.isArray(plans) && plans.length > 0 ? (
            plans.map((plan, index) => (
              <PricingCard key={plan.title || index} plan={plan} />
            ))
          ) : (
            <div className="col-span-full text-center text-slate-500">
              No pricing plans available
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Pricing;