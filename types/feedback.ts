
export type FeedbackType = 'Default' | 'Finded' | 'Invalid' | 'Not-Found';

export interface IFeedback {
  hash: string;
  feedbackType: FeedbackType;
}