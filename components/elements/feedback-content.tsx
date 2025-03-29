"use client";

import getFeedback from "@/lib/get-feedback";
import HashFetchFeedback from "./hash-fetch-feedback";
import Link from "next/link";
import UpComponentForm from "./up-component-form";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { FeedbackType } from "@/types/feedback";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setFeedbackValue } from "@/lib/slices/form-slice";
import DefaultLoading from "./default-loading";

export default function FeedbackContent({ hashValue }: { hashValue: string }) {
  const [feedback, setFeedback] = useState<FeedbackType>('Default');
  const [loading, setLoading] = useState<boolean>(false);

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

  const defaultData = (
    <>
      <HashFetchFeedback feedbackType={feedback} hash={hashValue} />
      {feedback === 'Not-Found' && (
        <div className="flex flex-row gap-4 mt-10">
          <Link href="/">
            <Button variant='outline' className="text-gray-600 cursor-pointer">Cancel</Button>
          </Link>
          <UpComponentForm>
            Up to blockchain
          </UpComponentForm>
        </div>
      )}
    </>
  )

  return !loading ? defaultData : <DefaultLoading />
}