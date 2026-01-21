import React from 'react';

export const People = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="83"
    height="60"
    viewBox="0 0 83 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="83" height="60" fill="url(#pattern0_3714_3921)" />
    <defs>
      <pattern
        id="pattern0_3714_3921"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use
          xlinkHref="#image0_3714_3921"
          transform="scale(0.0060241 0.00833333)"
        />
      </pattern>
      <image
        id="image0_3714_3921"
        width="166"
        height="120"
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
);
