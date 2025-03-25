import DefaultHashContentWrapper from "../wrappers/default-hash-content-wrapper";
import { DefaultFeedback } from "./feedback-states";

export default async function HashFetchFeedback({hash}: {hash: string}) {
  let children = <DefaultFeedback />

  if (hash) {

  }
  
  return (
    <DefaultHashContentWrapper>
      {children}
    </DefaultHashContentWrapper>
  );
}
