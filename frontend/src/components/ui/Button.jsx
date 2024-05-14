import React from "react";

export default function Button({ text, action }) {
  return (
    <div>
      <button className="mr-2 ml-2" onClick={action}>
        {text}
      </button>
    </div>
  );
}
