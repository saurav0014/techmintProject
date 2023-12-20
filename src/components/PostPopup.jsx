import { useEffect, useRef } from "react";

const PostPopup = ({ post, onClose }) => {
  const popupRef = useRef(null);

  // Close the popup when a click occurs outside the popup
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-1">
      <div className="fixed inset-0 bg-black opacity-10"></div>
      
      <div className="w-5/6 md:max-w-md bg-blue-300 p-4 rounded-2xl shadow-2xl" ref={popupRef}>
        <h3 className="font-bold text-xl">{post.title}</h3>
        <p className="text-lg">{post.body}</p>
      </div>
    </div>
  );
};

export default PostPopup;
