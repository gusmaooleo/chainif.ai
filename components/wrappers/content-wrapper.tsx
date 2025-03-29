"use client";

import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import DefaultLoading from "../loading/default-loading";

export default function ContentWrapper({children}: React.PropsWithChildren) {  
  let content = children;

  const { feedbackValue } = useSelector(
    (state: RootState) => state.form
  );

  if (feedbackValue === 'Fetching') {
    content = <DefaultLoading />
  }
  
  return (
    <div className="flex items-center w-screen flex-col h-full w-[30rem]">
      <div className="flex flex-col items-center h-full">
        {content}
      </div>
    </div>
  );
}
