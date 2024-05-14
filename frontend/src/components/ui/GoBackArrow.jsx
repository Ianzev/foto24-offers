import React from "react";
import { ArrowLeftToLine } from "lucide-react";
import { Link } from "react-router-dom";

export default function GoBackArrow({ text, backTo }) {
  return (
    <Link to={`/${backTo}`}>
      <ArrowLeftToLine className="mr-2 ml-2" size={20} />
      <h2>{text}</h2>
    </Link>
  );
}
