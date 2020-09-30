/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { jsx, css } from "@emotion/core";
import { SearchInput, NoResults } from "./components";

const API_ENDPOINT =
  "https://run.mocky.io/v3/aa894abe-879d-4751-a63c-5289ccdcf822";

function App() {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  async function fetchData() {
    setIsLoading(true);
    fetch(API_ENDPOINT)
      .then((res) => res.json())
      .then(({ data }) => {
        setIsLoading(false);
        setOriginalData(data);
        setFilteredData(data);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  /**
   * This useEffect is for the initial render (hence, the [])
   */
  useEffect(() => {
    fetchData();
  }, []);

  /**
   *  This useEffect updates the filteredList that is used to display the search results
   */
  useEffect(() => {
    const filteredNames = originalData.filter((name) => {
      return name.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredData(filteredNames);
  }, [searchText, originalData]);

  // const renderHighlightedText = (name) => {
  //   let parts = name.split(new RegExp(`(${searchText})`, "gi"));

  //   return (
  //     <div
  //       css={{
  //         display: "inline-flex",
  //         justifyContent: "center",
  //         border: "1px solid rgb(179, 179, 179)",
  //         boxSizing: "border-box",
  //         padding: "0.15em 1em",
  //       }}
  //     >
  //       {parts.map((part) => {
  //         return (
  //           <span
  //             style={
  //               part.toLowerCase() === searchText.toLowerCase()
  //                 ? {
  //                     fontWeight: "bold",
  //                     textDecoration: "underline",
  //                     backgroundColor: "yellow",
  //                   }
  //                 : {}
  //             }
  //           >
  //             {part}
  //           </span>
  //         );
  //       })}
  //     </div>
  //   );
  // };

  return (
    <div>
      <div
        css={{
          display: "flex",
          justifyContent: "center",
          padding: "1em",
        }}
      >
        {/* <input
          css={{
            fontSize: "1em",
            width: "25%",
            height: "3em",
            border: "1px solid rgb(204, 204, 204)",
            borderRadius: "4px",
            boxSizing: "border-box",
            outline: "none",
            paddingLeft: "16px",
            ":hover": {
              borderColor: "rgb(179, 179, 179)",
            },
            ":focus": {
              borderColor: "rgb(38, 132, 255)",
            },
            transition: "0.25s borderColor ease-in",
          }}
          type="text"
          placeholder="Enter a search term"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        /> */}
        <SearchInput
          placeholder="Enter a search term"
          onInputChange={(text) => {
            setSearchText(text);
          }}
        />
      </div>
      {isLoading && <span>loading</span>}
      {
        <div
          css={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 0.25fr)",
            gridGap: "0.5em",
          }}
        >
          {!isLoading &&
            filteredData.length > 0 &&
            filteredData.map((name) => (
              <div
                css={{
                  display: "inline-flex",
                  justifyContent: "center",
                  border: "1px solid rgb(179, 179, 179)",
                  boxSizing: "border-box",
                  padding: "0.15em 1em",
                }}
              >
                {name}
              </div>
            ))}
        </div>
      }
      {!isLoading && filteredData.length === 0 && <NoResults />}
    </div>
  );
}

export default App;
