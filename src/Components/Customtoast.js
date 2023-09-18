import React, { useState, useEffect } from "react";
const Customtoast = ({ show, message, color, onClose }) => {
  const [visible, setVisible] = useState(show);
  useEffect(() => {
    setVisible(show);
    if (show) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, 3000); // Auto-hide after 3 seconds (adjust as needed)
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);
  return (
    visible && (
      <div className={`toast show position-fixed bottom-0 end-0 bg-${color}`}>
        <div className="toast-header">
          <strong className="me-auto">Notification</strong>
          <button
            type="button"
            className="btn-close"
            onClick={() => {
              setVisible(false);
              onClose();
            }}
          ></button>
        </div>
        <div className="toast-body">{message}</div>
      </div>
    )
  );
};

export default Customtoast;
