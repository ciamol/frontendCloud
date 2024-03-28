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
      {...(type === 'file' && { multiple: false })}
      
    />
  );
});

export {Input};