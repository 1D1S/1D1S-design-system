import React from 'react';

const NextLinkMock = ({ children, href, ...props }: any) => {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
};

export default NextLinkMock;
