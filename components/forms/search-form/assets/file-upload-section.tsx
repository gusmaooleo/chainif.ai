import React from 'react';
import { FileWithPath } from 'react-dropzone';
import UpArchiveButton from '@/components/ui-elements/up-archive-button';
import AcceptedFiles from '@/components/ui-elements/accepted-files';

interface FileUploadSectionProps {
  files: FileWithPath[];
  getRootProps: () => any;
  getInputProps: () => any;
  clearFiles: () => void;
}

export const FileUploadSection = React.memo(
  ({ files, getRootProps, getInputProps, clearFiles }: FileUploadSectionProps) => (
    <>
      <UpArchiveButton getInputProps={getInputProps} getRootProps={getRootProps} />
      {files.length > 0 && <AcceptedFiles files={files} clearFiles={clearFiles} />}
    </>
  )
);