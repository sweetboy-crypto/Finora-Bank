import React from 'react';

const PageWrapper = ({ children }) => {
  return (
    <div className="animate-fadeIn">
      {children}
    </div>
  );
};

export default PageWrapper;
