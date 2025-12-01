import { useEffect, useRef } from "react";

declare global {
  interface Window {
    cloudinary: any;
  }
}

interface CloudinaryUploadWidgetProps {
  cloudName: string;
  uploadPreset: string;
  onUpload?: (info: any) => void;
}

const CloudinaryUploadWidget: React.FC<CloudinaryUploadWidgetProps> = ({
  cloudName,
  uploadPreset,
  onUpload,
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    if (!window.cloudinary) return;

    // Tạo widget CHỈ 1 lần
    widgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName,
        uploadPreset,
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          onUpload?.(result.info);
        }
      }
    );

    return () => {
      widgetRef.current = null;
    };
  }, [cloudName, uploadPreset, onUpload]);

  const openWidget = () => {
    widgetRef.current?.open();
  };

  return (
    <button
      ref={buttonRef}
      onClick={openWidget}
      className="cloudinary-button border p-2 rounded bg-orange-600 text-white"
      type="button"
    >
      <i className="fa-solid fa-cloud-arrow-up"></i> Upload
    </button>
  );
};

export default CloudinaryUploadWidget;
