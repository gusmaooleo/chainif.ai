"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RootState } from "@/utils/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setFeedbackValue,
} from "@/lib/slices/form-slice";
import { Button } from "../ui/button";
import { FormEvent } from "react";
import { optionsList } from "@/lib/constants/originOptions";
import { generateSHA256 } from "@/utils/sha-256-utils";
import { setSSEEvent } from "@/lib/slices/sse-slice";
import FormContent from "./assets/form-content";
import { ProcessSSEService } from "@/lib/services/ProcessSSEService";

export default function UpDataForm({ children }: React.PropsWithChildren) {
  const { inputValue, originValue, authorValue } = useSelector(
    (state: RootState) => state.form
  );
  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    dispatch(setFeedbackValue("Fetching"));
    const author = getAuthorName(originValue.value, authorValue);
    const content = inputValue;
    const hash = await generateSHA256(content);
    window.history.pushState(null, "", `/${hash}`);
  
    try {
      await ProcessSSEService.uploadContent(
        { content, author },
        {
          onData: (data) => dispatch(setSSEEvent({ ...data })),
          onError: (error) => {
            dispatch(
              setSSEEvent({
                type: "error",
                message: error.message,
              })
            );
            throw error;
          },
        }
      );
      
      dispatch(setFeedbackValue("Found"));
    } catch (error: any) {
      dispatch(
        setSSEEvent({
          type: "error",
          message: error.message,
        })
      );
      dispatch(setFeedbackValue("Error"));
    }
  };

  const getAuthorName = (origin: string, customAuthor: string) => {
    return origin !== optionsList.Authorial.value ? origin : customAuthor;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-d-button hover:bg-d-button-hover">
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register data on blockchain</DialogTitle>
        </DialogHeader>
        <FormContent handleFormSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
