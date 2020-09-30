/** @jsx jsx */
import { useEffect, useState } from "react";
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

  const performFilter = (searchText) => {
    return namesList.filter((name) =>
      name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  useEffect(() => {
    fetchNameData();
    setSearchText(text);
  }, [text]);

  useEffect(() => {
    const filteredNames = performFilter(text);
    setFilteredData(filteredNames);
  }, [namesList]);

  useEffect(() => {
    const filteredNames = performFilter(searchText);
    setFilteredData(filteredNames);
  }, [searchText]);

  return (
    <div>
      <div
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1em",
        }}
      >
        <SearchInput
          type="text"
          placeholder="Enter a search value"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
        {searchText.length > 0 && filteredData.length !== 0 && (
          <div css={{ margin: "0em 3em" }}>
            <a
              href={`${window.location}search?name=${searchText}`}
              target="_blank"
              rel="noopener noreferrer"
              css={{
                display: "inline-flex",
                border: "2px solid rgb(204, 204, 204)",
                borderRadius: "4px",
                padding: "0.15em 0.5em",
                textDecoration: "none",
                color: "#444",
              }}
            >
              Copy (& share) url{" "}
              <span role="img" aria-label="share url icon">
                🔗
              </span>
            </a>
          </div>
        )}
      </div>
      {isLoading && <Loading dimensions={[100, 100]} />}
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
                key={name}
                css={{
                  fontSize: "0.75em",
                  display: "inline-flex",
                  justifyContent: "center",
                  border: "1px solid rgb(179, 179, 179)",
                  boxSizing: "border-box",
                  padding: "0.15em 0.5em",
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
