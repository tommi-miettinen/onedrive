import { useRef } from "react";
import { uploadImage } from "../store/imageStore";

interface FileWithSrc extends File {
  src: string;
}

interface FileUploaderProps {
  onUpload?: (res: any) => any;
  className?: string;
  children: JSX.Element | JSX.Element[];
}

const FileUploader = ({ onUpload, className, children }: FileUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && (e.target.files[0] as FileWithSrc);
    if (file) {
      try {
        const res = await uploadImage(file);
        if (!onUpload || !res) return;
        onUpload(res);
      } catch (err) {}
    }
  };

  return (
    <div className={className} onClick={() => fileInputRef.current?.click()}>
      <input className="hidden" type="file" ref={fileInputRef} onChange={handleFileChange} />
      {children}
    </div>
  );
};

export default FileUploader;
