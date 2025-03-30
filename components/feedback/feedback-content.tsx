"use client";

import getFeedback from "./actions/actions";
import Link from "next/link";
import UpDataForm from "../forms/up-data-form";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setFeedbackValue } from "@/lib/slices/form-slice";
import DefaultLoading from "../loading/default-loading";
import { ErrorFeedback, InvalidFeedback, NotFoundFeedback } from "./feedback-states";
import { setSSEEvent } from "@/lib/slices/sse-slice";
import FoundData from "../ui-elements/found-data";

export default function FeedbackContent({ hashValue }: { hashValue: string }) {
  const { feedbackValue } = useSelector((state: RootState) => state.form);
  const { eventType, eventData } = useSelector((state: RootState) => state.sse);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Feedback-content')
    if (!hashValue) return;
    
    const fetchData = async () => {
      dispatch(setFeedbackValue('Fetching'));
      const fetchFeedback = await getFeedback(hashValue);
      dispatch(setFeedbackValue(fetchFeedback.feedback));
      if (fetchFeedback.feedback === 'Found' && fetchFeedback.data) {
        dispatch(setSSEEvent({ type: 'complete', data: fetchFeedback.data }));
      }
    };
    
    fetchData();
  }, [hashValue, dispatch]);

  if (!hashValue) return null;
  switch(feedbackValue) {
    case 'Found':
      return <FoundData data={eventData} type={eventType} />;
    case 'Not-Found':
      return (
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
    case 'Invalid':
      return <InvalidFeedback />;
    case 'Fetching':
      return <DefaultLoading />;
    case 'Error':
      return <ErrorFeedback error={eventData?.message} />
    default:
      return null;
  }
}