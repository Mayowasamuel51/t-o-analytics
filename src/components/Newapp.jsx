
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NewFeaturePopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem("seenNewCFeature");
    if (!hasSeen) {
      // Show popup for first-time visitors
      setShow(true);
      localStorage.setItem("seenNewCFeature", "true");
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-[90%] text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              🎉 New Feature Available!
            </h2>
            <p className="text-gray-600 mb-6">
              You can now easily check your{" "}
              <span className="font-semibold text-blue-600">
                class schedule
              </span>{" "}
              inside your dashboard.
            </p>
            <button
              onClick={() => setShow(false)}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Got it!
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewFeaturePopup;

// import { useEffect, useState } from "react";

// const NewFeaturePopup = () => {
//   const [show, setShow] = useState(false);

//   useEffect(() => {
//     const seen = localStorage.getItem("seenNewNotesFeature");
//     if (!seen) {
//       setShow(true);
//       localStorage.setItem("seenNewNotesFeature", "true");
//     }
//   }, []);

//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
//       <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm text-center">
//         <h2 className="text-2xl font-semibold mb-2">🎉 New Feature!</h2>
//         <p className="text-gray-600 mb-4">
//           You can now <b>take notes</b> directly while watching your classes.
//           Your notes will be saved automatically!
//         </p>
//         <button
//           onClick={() => setShow(false)}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//         >
//           Got it
//         </button>
//       </div>
//     </div>
//   );
// };

// export default NewFeaturePopup;
