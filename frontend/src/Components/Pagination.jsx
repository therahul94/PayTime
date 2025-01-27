import React, { useState } from "react";
import Button from "./Button";

export default function Pagination({
  CurrentPage,
  setCurrentPage,
  totalPages,
}) {
  let [timeoutidPrev] = useState(null);
  let [timeoutidNext] = useState(null);
  function handlePrevPage() {
    clearTimeout(timeoutidPrev);
    timeoutidPrev = setTimeout(()=>{
      setCurrentPage((curr) => (curr >= 2 ? curr - 1 : 1))
    }, 400);
  }
  function handleNextPage() {
    clearTimeout(timeoutidNext);
    timeoutidNext = setTimeout(()=>{
      setCurrentPage((curr) => curr < totalPages ? curr + 1 : 1)
    }, 400);
  }
  return (
    <div>
      {totalPages ? (
        <div className="flex justify-end items-center">
          <div>
            <Button
              label={"prev"}
              onClick={handlePrevPage}
            />
          </div>
          <div className="mx-3">{CurrentPage} of {totalPages}</div>
          <div>
            <Button
              label={"next"}
              onClick={handleNextPage}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
