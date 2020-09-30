/** @jsx jsx */
import { jsx } from "@emotion/core";

export function NoResults() {
  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: "2.5em",
      }}
    >
      <h2 css={{ color: "slategray" }}>
        No results found{" "}
        <span role="img" aria-label="no results found">
          😔
        </span>
      </h2>
    </div>
  );
}
