"use client";

import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import getFeedback from "./actions/actions";
import UpDataForm from "../forms/up-data-form";
import { Button } from "../ui/button";
import { RootState } from "@/lib/store";
import { setFeedbackValue } from "@/lib/slices/form-slice";
import DefaultLoading from "../loading/default-loading";
import { ErrorFeedback, InvalidFeedback, NotFoundFeedback } from "./feedback-states";
import { setSSEEvent } from "@/lib/slices/sse-slice";
import FoundData from "../ui-elements/found-data";

const MemoizedNotFoundFeedback = () => (
  <>
    <NotFoundFeedback />
    <div className="flex flex-row gap-4 mt-10">
      <Link href="/">
        <Button variant='outline'>Cancel</Button>
      </Link>
      <UpDataForm>Up to blockchain</UpDataForm>
    </div>
  </>
);

export default function FeedbackContent({ hashValue }: { hashValue: string }) {
  const { feedbackValue } = useSelector((state: RootState) => state.form);
  const { eventType, eventData } = useSelector((state: RootState) => state.sse);
  const dispatch = useDispatch();

  const fetchFeedbackData = useCallback(async () => {
    if (!hashValue) return;
    
    dispatch(setFeedbackValue('Fetching'));
    try {
      const fetchFeedback = await getFeedback(hashValue);
      dispatch(setFeedbackValue(fetchFeedback.feedback));
      if (fetchFeedback.feedback === 'Found' && fetchFeedback.data) {
        dispatch(setSSEEvent({ type: 'complete', data: fetchFeedback.data }));
      }
    } catch (error) {
      dispatch(setFeedbackValue('Error'));
      dispatch(setSSEEvent({ 
        type: 'error', 
        data: { message: error instanceof Error ? error.message : 'Unknown error' }
      }));
    }
  }, [hashValue, dispatch]);

  useEffect(() => {
    fetchFeedbackData();
  }, [fetchFeedbackData]);

  const renderedContent = useMemo(() => {
    if (!hashValue) return null;
    
    switch(feedbackValue) {
      case 'Found':
        return <FoundData data={eventData} type={eventType} />;
      case 'Not-Found':
        return <MemoizedNotFoundFeedback />;
      case 'Invalid':
        return <InvalidFeedback />;
      case 'Fetching':
        return <DefaultLoading />;
      case 'Error':
        return <ErrorFeedback error={eventData?.message} />;
      default:
        return null;
    }
  }, [feedbackValue, eventData, eventType, hashValue]);

  return renderedContent;
}