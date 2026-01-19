import React from 'react';

const NextImageMock = ({ src, alt, ...props }: any) => {
  return <img src={src} alt={alt} {...props} />;
};

export default NextImageMock;
