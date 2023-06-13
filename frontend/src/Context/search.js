import { useState, useEffect, createContext } from "react";

const SearchContext = createContext();

const SearchProvider = (props) => {
  const [searchObj, setSearchObj] = useState({
    keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={[searchObj, setSearchObj]}>
      {props.children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider };
