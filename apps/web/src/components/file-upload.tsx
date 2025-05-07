import { X } from 'lucide-react';

import { UploadFile } from '@/hooks/useUploadFile';

import { cn } from '@/lib/utils';
import { Dropzone } from './Dropzone';
import { FileViewer } from './file-viewer';
import { Button } from './ui/button';
import { Card } from './ui/card';

type ButtonProps = {
  isFileUploading: boolean;
  fileUploadedName?: string;
};

type FileUploadProps = {
  file: UploadFile;
  fileUploaded?: {
    name: string;
    url: string;
    file_name: string;
  };

  buttonTexts?: (b: ButtonProps) => string;

  uploadType?: 'image' | 'pdf' | 'audio' | 'all';

  hight?: 'sm' | 'md' | 'lg';
};

export function FileUpload({
  file,
  fileUploaded,
  buttonTexts,
  uploadType,
  hight,
}: FileUploadProps) {
  return (
    <div className="flex w-full max-w-[600px] flex-col gap-4">
      <Card
        className={cn(
          'relative flex h-[502px] w-full max-w-[700px] flex-col rounded-lg',
          hight === 'sm' && 'h-[200px]',
          hight === 'md' && 'h-[300px]',
          hight === 'lg' && 'h-[400px]',
        )}
      >
        {fileUploaded ? (
          <FileViewer
            url={fileUploaded.url}
            file_name={fileUploaded.file_name}
            name={fileUploaded.name}
          />
        ) : file.fileUrl && file.localFile ? (
          <>
            <div className="absolute right-0 top-0 z-10 rounded-bl-lg rounded-tr-lg bg-white dark:bg-black">
              <button
                type="button"
                onClick={() => {
                  file.handleRemoveFile();
                }}
                className="bg-primary hover:bg-primary/95 disabled:bg-primary/35 rounded-bl-lg rounded-tr-lg p-2 text-white"
                disabled={!!file.fileUploadedName}
              >
                <X />
              </button>
            </div>
            {file.localFile.type === 'application/pdf' ? (
              <iframe
                src={file.fileUrl}
                frameBorder="0"
                title={file.fileUrl}
                className="h-full w-full rounded-lg"
              />
            ) : file.localFile.type.startsWith('image') ? (
              <img src={file.fileUrl} alt="" className="w-full overflow-x-auto rounded-lg" />
            ) : file.localFile.type.startsWith('audio') ? (
              <div className="flex h-full w-full items-center justify-center p-4">
                <audio src={file.fileUrl} controls>
                  <track kind="captions" />
                </audio>
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center p-4">
                <p>Arquivo não suportado - {file.localFile.type}</p>
              </div>
            )}
          </>
        ) : (
          <div className={cn('h-full w-full p-4')}>
            <Dropzone onUpload={file.handleUpload} uploadType={uploadType} />
          </div>
        )}
      </Card>

      {!fileUploaded && (
        <Button
          onClick={file.handleUploadFile}
          disabled={file.isFileUploading || !!file.fileUploadedName}
        >
          {
            buttonTexts
              ? buttonTexts({
                  isFileUploading: file.isFileUploading,
                  fileUploadedName: file.fileUploadedName,
                })
              : file.isFileUploading
                ? 'Enviando...'
                : file.fileUploadedName
                ? 'Arquivo enviado' // eslint-disable-line
                : 'Enviar arquivo'/*eslint-disable-line*/
          }
        </Button>
      )}
    </div>
  );
}
