"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setInputValue,
  setOriginValue,
  setAuthorValue,
  setFeedbackValue,
} from "@/lib/slices/form-slice";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { FormEvent } from "react";
import { optionsList } from "@/lib/constants/originOptions";
import { generateSHA256 } from "@/lib/sha-256-utils";
import { setSSEEvent } from "@/lib/slices/sse-slice";
import OriginDropdownSelector from "../ui-elements/origin-dropdown-selector";
import { SSEEventData, SSEEventType } from "@/types/sseevent";
import { parseSSEData } from "@/lib/parse-ssedata";

export default function UpDataForm({ children }: React.PropsWithChildren) {
  const { inputValue, originValue, authorValue } = useSelector(
    (state: RootState) => state.form
  );
  const dispatch = useDispatch();

  // TODO: hash must be generated on server and client side.
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    dispatch(setFeedbackValue('Fetching'));
    const author = originValue.value !== optionsList.Authorial.value ? originValue.value : authorValue;
    const content = inputValue;
    const hash = await generateSHA256(content);
    window.history.pushState(null, '', `/${hash}`)
    
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, author }),
      });

      if (!response.body) throw new Error('Sem corpo de resposta');
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const events = chunk.split('\n\n').filter(Boolean);
        
        for (const event of events) {
          const lines = event.split('\n');
          const type = lines.find(l => l.startsWith('event:'))?.split(': ')[1] as SSEEventType;
          const data = parseSSEData(lines) as SSEEventData;
          
          dispatch(setSSEEvent({ type, data }));
          if (data.error === 400) {
            throw new Error("Check that all data has been passed correctly.")
          }
        }
      }
      dispatch(setFeedbackValue('Found'));
    } catch (error: any) {
      dispatch(setSSEEvent({ type: 'error', data: { error: 400, message: error.message } }));
      dispatch(setFeedbackValue('Error'));
    }
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
        <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-row w-full gap-4">
            <Input
              placeholder="Insert the author name"
              className="rounded-full text-sm text-gray-600 placeholder:text-gray-300"
              onChange={(e) => dispatch(setAuthorValue(e.target.value))}
              disabled={originValue.value !== optionsList.Authorial.value}
              required
            />
            <OriginDropdownSelector
              setOrigin={(value) => dispatch(setOriginValue(value))}
            />
          </div>
          <Textarea
            defaultValue={inputValue}
            placeholder="Registered content"
            className="text-sm text-gray-600 placeholder:text-gray-300 min-h-[200px] max-h-[500px]"
            onChange={(e) => dispatch(setInputValue(e.target.value))}
            required
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
            <Button type="submit">
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}