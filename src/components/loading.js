/** @jsx jsx */
import { jsx } from "@emotion/core";
import Spinner from "react-svg-spinner";

export function Loading({ dimensions }) {
  const [width, height] = dimensions;
  return (
    <div
      css={{
        position: "absolute",
        top: "0px",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        opacity: 0.7,
        zIndex: 1,
      }}
    >
      <div
        css={{
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      >
        <Spinner height={height} width={width} color="rgb(38, 132, 255)" />
      </div>
    </div>
  );
}
