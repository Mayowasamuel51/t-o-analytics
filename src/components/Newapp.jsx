import { useEffect, useState } from "react";

const NewFeaturePopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("seenNewNotesFeature");
    if (!seen) {
      setShow(true);
      localStorage.setItem("seenNewNotesFeature", "true");
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm text-center">
        <h2 className="text-2xl font-semibold mb-2">🎉 New Feature!</h2>
        <p className="text-gray-600 mb-4">
          You can now <b>take notes</b> directly while watching your classes.
          Your notes will be saved automatically!
        </p>
        <button
          onClick={() => setShow(false)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default NewFeaturePopup;
