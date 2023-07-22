import { useRef } from "react";

interface FileUploaderProps {
  upload: (file: File) => Promise<void> | void;
  className?: string;
  children: JSX.Element | JSX.Element[];
}

const FileUploader = ({ upload, className, children }: FileUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    void upload(file);
  };

  return (
    <div
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
      aria-label="Upload file"
      role="button"
      className={className}
      onClick={() => fileInputRef.current?.click()}
    >
      <input className="hidden" type="file" ref={fileInputRef} onChange={handleFileChange} />
      {children}
    </div>
  );
};

export default FileUploader;
