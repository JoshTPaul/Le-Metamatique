import * as React from "react";

function Tick(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" {...props}>
      <path fill="#27231E" d="M0 0h20v20H0z" />
      <path
        stroke="#F5E0C1"
        strokeWidth={0.938}
        d="M7.696 13.204l7.071-7.071M8.107 12.909L4.57 9.373"
      />
    </svg>
  );
}

export default React.memo(Tick);
