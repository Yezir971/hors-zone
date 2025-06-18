import { DNA } from "react-loader-spinner";

export default function Loading() {
  return(
    <>
      <DNA
        visible={true}
        height="40"
        width="40"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </>
  )
}