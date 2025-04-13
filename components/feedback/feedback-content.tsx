"use client";

import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import getFeedback from "./actions/actions";
import { RootState } from "@/lib/config/store";
import { setFeedbackValue } from "@/lib/slices/form-slice";
import DefaultLoading from "../loading/default-loading";
import { ErrorFeedback } from "./feedback-states/error";
import { InvalidFeedback } from "./feedback-states/invalid";
import { NotFoundFeedback } from "./feedback-states/not-found";
import { setSSEEvent } from "@/lib/slices/sse-slice";
import FoundData from "../found-data/found-data";
import SentToChain from "./feedback-states/sent-to-chain";

export default function FeedbackContent({ hashValue }: { hashValue: string }) {
  const { feedbackValue } = useSelector((state: RootState) => state.form);
  const { eventData } = useSelector((state: RootState) => state.sse);
  const dispatch = useDispatch();

  const fetchFeedbackData = useCallback(async () => {
    if (!hashValue) return;
    dispatch(setFeedbackValue("Fetching"));
    
    try {
      const fetchFeedback = await getFeedback(hashValue);
      dispatch(setFeedbackValue(fetchFeedback.feedback));
      if (
        fetchFeedback.feedback === "Found" &&
        fetchFeedback.data &&
        fetchFeedback.data.type === "complete"
      ) {
        const recievedData = fetchFeedback.data;
        dispatch(
          setSSEEvent({
            type: "complete",
            data: recievedData.data,
            hash: recievedData.hash,
            success: recievedData.success,
            message: recievedData.message,
            state: recievedData.state,
            date: recievedData.date,
            author: recievedData.author,
            tx_id: recievedData.tx_id,
          })
        );
      }
    } catch (error: any) {
      dispatch(setFeedbackValue("Error"));
      dispatch(
        setSSEEvent({
          type: "error",
          message: error.message,
        })
      );
    }
  }, [hashValue, dispatch]);

  useEffect(() => {
    fetchFeedbackData();
  }, [fetchFeedbackData]);

  const renderedContent = useMemo(() => {
    if (!hashValue) return null;

    switch (feedbackValue) {
      case "Found":
        return <FoundData data={eventData} />;
      case "Not-Found":
        return <NotFoundFeedback />;
      case "Invalid":
        return <InvalidFeedback />;
      case "Fetching":
        return <DefaultLoading />;
      case "Error":
        if (eventData?.type === 'error') {
          return <ErrorFeedback error={eventData?.message} />;
        }
        return <ErrorFeedback error="Unknown errror."/>
      case "Sent-To-Chain":
        return <SentToChain hash={hashValue} />
      default:
        return null;
    }
  }, [feedbackValue, eventData, hashValue]);

  return renderedContent;
}
