"use client";

import { ChangeEvent, useState } from "react";

type CodeProps = {
  placeholder: string;
  initialValue?: string;
};

export default function Code(props: CodeProps) {
  const { placeholder, initialValue } = props;
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <textarea
      className="w-1/2 resize-none"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      rows={30}
    />
  );
}
