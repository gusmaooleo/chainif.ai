export type FeedbackType = 'Found' | 'Invalid' | 'Not-Found' | 'Fetching' | 'Default';

export interface IFeedback {
  hash: string;
  feedbackType: FeedbackType;
}