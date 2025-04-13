import { RequestForm } from '@/types/form';
import { IEventStreamService } from './IEventStreamService';

export interface IUploadService {
  handleUpload(body: RequestForm, eventStream: IEventStreamService): Promise<void>;
}