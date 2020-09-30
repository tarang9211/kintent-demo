/** @jsx jsx */
import { jsx } from "@emotion/core";

export function NoResults() {
  return (
    <div
      css={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <h2>
        No results found{" "}
        <span role="img" aria-label="no results found">
          😔
        </span>
      </h2>
    </div>
  );
}
