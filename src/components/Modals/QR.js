import { useState, useEffect } from "react";
import QRCode from "qrcode";
import ClickOutside from "../../hooks/ClickOutside";
const QR = ({ QR, setQrcode }) => {
  const domNode = ClickOutside(() => {
    setQrcode(false);
  });
  const [src, setSrc] = useState("");
  useEffect(() => {
    QRCode.toDataURL(QR).then(setSrc);
  }, []);
  return (
    <main className="fixed bg-black bg-opacity-20 left-0 top-0  z-50 h-screen w-screen">
      <section
        className="bg-white max-w-md mx-auto p-6 translate-y-40 rounded-lg text-center"
        ref={domNode}
      >
        <div className="flex justify-end">
          <button onClick={() => setQrcode(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <img src={src} className="mx-auto" />
        <p>Scan the QR code </p>
      </section>
    </main>
  );
};

export default QR;
