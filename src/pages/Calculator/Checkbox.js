import React from 'react';

// eslint-disable-next-line
export default function Checkbox({ checked, value, onChange }) {
  return <input type="checkbox" checked={checked} value={value} onChange={onChange} />;
}
