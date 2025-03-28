export type FeedbackType = 'Found' | 'Invalid' | 'Not-Found';

export interface IFeedback {
  hash: string;
  feedbackType: FeedbackType;
}