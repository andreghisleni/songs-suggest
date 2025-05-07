import { useCallback, useState } from 'react';

type UseUploadFile = {
  handleUploadFunction: (f: File) => Promise<
    | {
        file_name: string;
        reset?: boolean;
      }
    | undefined
  >;
  serverFileUrl?: string;
};

export function useUploadFile({ handleUploadFunction, serverFileUrl }: UseUploadFile) {
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [fileUploadedName, setFileUploadedName] = useState<string>();

  const [localFile, setLocalFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(serverFileUrl || null);

  const handleUpload = useCallback((f: File[]) => {
    setLocalFile(f[0]);
    setFileUrl(URL.createObjectURL(f[0]));
  }, []);

  const handleRemoveFile = useCallback(() => {
    setLocalFile(null);
    setFileUrl(null);
  }, []);

  const handleUploadFile = useCallback(async () => {
    if (!localFile) return;

    setIsFileUploading(true);

    const response = await handleUploadFunction(localFile);

    if (!response) {
      setIsFileUploading(false);
      return;
    }

    setFileUploadedName(response.file_name);

    if (response.reset) {
      setLocalFile(null);
      setFileUrl(null);
    }

    setIsFileUploading(false);
  }, [localFile, handleUploadFunction]);

  return {
    isFileUploading,
    fileUploadedName,
    localFile,
    fileUrl,
    handleUpload,
    handleRemoveFile,
    handleUploadFile,
  };
}

export type UploadFile = ReturnType<typeof useUploadFile>;
