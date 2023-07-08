import { useRef, useState, Fragment } from "react";
import { uploadImage } from "../store/imageStore";
import LoadingModal from "./LoadingModal";

interface FileWithSrc extends File {
  src: string;
}

interface FileUploaderProps {
  onUpload?: (res: any) => any;
  className?: string;
  children: JSX.Element | JSX.Element[];
}

const FileUploader = ({ onUpload, className, children }: FileUploaderProps) => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && (e.target.files[0] as FileWithSrc);
    if (file) {
      try {
        setLoading(true);
        const res = await uploadImage(file);
        if (!onUpload || !res) return;
        onUpload(res);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }
  };

  return (
    <Fragment>
      <div className={className} onClick={() => fileInputRef.current?.click()}>
        <input className="hidden" type="file" ref={fileInputRef} onChange={handleFileChange} />
        {children}
      </div>
      {loading && <LoadingModal message="Tiedostoa lähetetään" />}
    </Fragment>
  );
};

export default FileUploader;
