"use client";

import getFeedback from "./actions/actions";
import Link from "next/link";
import UpDataForm from "../forms/up-data-form";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { FeedbackType } from "@/types/feedback";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setFeedbackValue } from "@/lib/slices/form-slice";
import DefaultLoading from "../loading/default-loading";
import { FoundFeedback, InvalidFeedback, NotFoundFeedback } from "./feedback-states";

export default function FeedbackContent({ hashValue }: { hashValue: string }) {
  const [feedback, setFeedback] = useState<FeedbackType>('Default');
  const [loading, setLoading] = useState<boolean>(false);
  let feedbackComponent: React.ReactNode;

  const { feedbackValue } = useSelector(
    (state: RootState) => state.form
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const fetchFeedback = await getFeedback(hashValue);
      setFeedback(fetchFeedback);
      setLoading(false)
    }
    
    if (feedbackValue === 'Found') {
      dispatch(setFeedbackValue('Default'))
      setFeedback('Found');
    } else {
      fetch();
    }
  }, [])
  
  if (!hashValue) {
    return <></>
  }


  switch(feedback) {
    case 'Found':
      feedbackComponent = <FoundFeedback hash={hashValue} />;
      break;
    case 'Not-Found':
      feedbackComponent = <NotFoundFeedback />;
      break;
    case 'Invalid':
      feedbackComponent = <InvalidFeedback />;
      break; 
    default:
      feedbackComponent = <></>;
      break;
  }


  const defaultData = (
    <>
      {feedbackComponent}
      {feedback === 'Not-Found' && (
        <div className="flex flex-row gap-4 mt-10">
          <Link href="/">
            <Button variant='outline' className="text-gray-600 cursor-pointer">Cancel</Button>
          </Link>
          <UpDataForm>
            Up to blockchain
          </UpDataForm>
        </div>
      )}
    </>
  )

  return !loading ? defaultData : <DefaultLoading />
}