import { useState } from "react";

function useArchives() {
  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return {
    value,
    handleTabChange,
  };
}

export default useArchives;
