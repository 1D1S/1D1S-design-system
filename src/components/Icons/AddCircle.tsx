import React from 'react';

export const AddCircle = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="60" height="60" fill="url(#pattern0_3714_3925)" />
    <defs>
      <pattern
        id="pattern0_3714_3925"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlinkHref="#image0_3714_3925" transform="translate(-0.1 -0.1) scale(0.0125)" />
      </pattern>
      <image
        id="image0_3714_3925"
        width="96"
        height="96"
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
);
