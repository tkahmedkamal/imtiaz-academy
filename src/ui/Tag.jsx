import React from 'react';

const Tag = ({ label, status }) => {
  const variants = {
    success: 'bg-common-success/10 text-common-success',
    error: 'bg-common-error/10 text-common-error',
    warn: 'bg-common-warning/10 text-common-warning',
    info: 'bg-common-info/10 text-common-info',
  };

  return (
    <span
      className={`mr-2 inline-flex items-center rounded-full px-2.5  py-0.5 font-publicSans text-sm font-bold capitalize ${variants[status]}`}
    >
      {label}
    </span>
  );
};

export default Tag;
