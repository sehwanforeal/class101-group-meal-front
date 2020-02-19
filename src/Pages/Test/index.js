import React from "react";
import testResult1 from "../../Data/testResult";

export default function Test() {
  return (
    <>
      {testResult1.map(e => (
        <div style={{ margin: `30px 0 0 0`, display: `flex` }}>
          {e.map(e => (
            <div
              style={{
                border: `1px solid black`,
                padding: `3px 0`,
                width: `100%`,
                textAlign: `center`,
                verticalAlign: `center`
              }}
            >
              {e}
            </div>
          ))}
        </div>
      ))}
      <p style={{ margin: `30px 0 0 0`, display: `flex` }}></p>
    </>
  );
}
