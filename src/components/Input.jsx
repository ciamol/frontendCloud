import React from 'react';

const Input = React.forwardRef(({ type, className, name, placeholder, value, onChange, accept }, ref) => {
  return (
    <input
      accept={accept}
      ref={ref}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`form-control form-control-sm ${className}`}  
      {...(type === 'file' && { multiple: false })}      // multiple = {`true`}
    //   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
    />
  );
});

export {Input};