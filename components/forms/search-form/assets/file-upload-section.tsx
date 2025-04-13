import React from 'react';
import UpArchiveButton from '@/components/ui-elements/up-archive-button';
import AcceptedFiles from '@/components/ui-elements/accepted-files';
import { SerializableFile } from '@/types/serializable-file';

interface FileUploadSectionProps {
  file: SerializableFile | null;
  getRootProps: () => any;
  getInputProps: () => any;
  clearFiles: () => void;
}

export const FileUploadSection = React.memo(
  ({ file, getRootProps, getInputProps, clearFiles }: FileUploadSectionProps) => (
    <>
      <UpArchiveButton getInputProps={getInputProps} getRootProps={getRootProps} />
      {!!file && <AcceptedFiles file={file} clearFiles={clearFiles} />}
    </>
  )
);