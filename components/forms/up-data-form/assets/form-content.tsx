import { RootState } from "@/utils/store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { setInputValue, setOriginValue } from "@/lib/slices/form-slice";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import AuthorInput from "./author-input";
import OriginDropdownSelector from "@/components/forms/up-data-form/assets/origin-dropdown-selector";
import ContentTextarea from "./content-textarea";
import { FormEvent } from "react";

const FormContent = ({handleFormSubmit}: {handleFormSubmit: (e: FormEvent) => Promise<void>}) => {
  const { inputValue, originValue } = useSelector(
    (state: RootState) => state.form
  );
  const dispatch = useDispatch();

  return (
    <form className="flex flex-col w-full gap-4" onSubmit={handleFormSubmit}>
      <div className="flex flex-row w-full gap-4">
        <AuthorInput />
        <OriginDropdownSelector
          setOrigin={(value) => dispatch(setOriginValue(value))}
        />
      </div>
      <ContentTextarea 
        value={inputValue} 
        onChange={(value) => dispatch(setInputValue(value))} 
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
  );
};

export default FormContent;