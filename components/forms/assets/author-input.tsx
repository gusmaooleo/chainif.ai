import { Input } from "@/components/ui/input";
import { optionsList } from "@/lib/constants/originOptions";
import { setAuthorValue } from "@/lib/slices/form-slice";
import { RootState } from "@/utils/store";
import { useDispatch, useSelector } from "react-redux";

const AuthorInput = () => {
  const { originValue, authorValue } = useSelector(
    (state: RootState) => state.form
  );
  const dispatch = useDispatch();

  return (
    <Input
      placeholder="Insert the author name"
      className="rounded-full text-sm text-gray-600 placeholder:text-gray-300"
      onChange={(e) => dispatch(setAuthorValue(e.target.value))}
      disabled={originValue.value !== optionsList.Authorial.value}
      required
    />
  );
};

export default AuthorInput;