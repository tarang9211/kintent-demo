/** @jsx jsx */
import { useCallback, useEffect, useState } from "react";
import { jsx } from "@emotion/core";
import { NoResults, SearchInput, Loading } from "./components";

const API_ENDPOINT =
  "https://run.mocky.io/v3/aa894abe-879d-4751-a63c-5289ccdcf822";

function useQueryParams() {
  return new URLSearchParams(window.location.search);
}

function Home() {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [namesList, setNamesList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  async function fetchNameData() {
    setIsLoading(true);
    setFilteredData(null);
    fetch(API_ENDPOINT)
      .then((res) => res.json())
      .then(({ data }) => {
        // setTimeout to simulate a more loading time so the <Loading /> component shows up
        setTimeout(() => {
          setNamesList(data);
          setIsLoading(false);
        }, 500);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  const query = useQueryParams();
  const text = query.get("name") !== null ? query.get("name") : "";

  const performFilterCallBack = useCallback(() => {
    return namesList.filter((name) => {
      return name.toLowerCase().includes(searchText.toLowerCase());
    });
  }, [searchText, namesList]);

  useEffect(() => {
    fetchNameData();
    setSearchText(text);
  }, [text]);

  useEffect(() => {
    const filteredNames = performFilterCallBack();
    setFilteredData(filteredNames);
  }, [performFilterCallBack]);

  return (
    <div>
      <div
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "0em 0em 1em 0em",
          paddingLeft: "2.5em",
          position: "fixed",
        }}
      >
        <SearchInput
          type="text"
          placeholder="Enter name"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
        {searchText.length > 0 && filteredData.length !== 0 && (
          <div css={{ margin: "0em 3em" }}>
            <a
              href={`${window.origin}/search?name=${searchText}`}
              target="_blank"
              rel="noopener noreferrer"
              css={{
                display: "inline-flex",
                borderRadius: "4px",
                padding: "0.15em 0.5em",
                textDecoration: "none",
                color: "#fff",
                background: "rgb(38, 132, 255)",
                fontSize: "0.75em",
              }}
            >
              Open search in new tab &nbsp; &nbsp;
              <span role="img" aria-label="share url icon">
                🔗
              </span>
            </a>
          </div>
        )}
      </div>
      {isLoading && <Loading dimensions={[100, 100]} />}
      {
        <div css={{ paddingLeft: "2.5em", paddingTop: "4em" }}>
          {!isLoading &&
            filteredData.length > 0 &&
            filteredData.map((name) => (
              <div
                key={name}
                css={{
                  fontSize: "0.75em",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  boxSizing: "border-box",
                  padding: "0.75em 0em",
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

export default Home;
