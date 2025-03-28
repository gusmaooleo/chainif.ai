"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { setInputValue, setOriginValue } from "@/lib/slices/form-slice";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import OriginDropdownSelector from "./origin-dropdown-selector";
import { Button } from "../ui/button";
import { FormEvent } from "react";

export default function UpComponentForm({ children }: React.PropsWithChildren) {
  const { inputValue, originValue } = useSelector(
    (state: RootState) => state.form
  );
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(inputValue, originValue);
  }

  return (
    <Dialog>
      <DialogTrigger className="text-sm text-gray-000 bg-d-button hover:bg-d-button-hover py-2 px-4 rounded-lg cursor-pointer transition-colors">
        {children}
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
              required
            />
            <OriginDropdownSelector
              setOrigin={(value) => dispatch(setOriginValue(value))}
            />
          </div>
          <Textarea
            defaultValue={inputValue}
            placeholder="Registered content"
            className="text-sm text-gray-600 placeholder:text-gray-300 min-h-[200px]"
            onChange={(e) => dispatch(setInputValue(e.target.value))}
            required
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
