import React, { useState, useEffect } from 'react';
import { IconPicker as Picker } from 'react-fa-icon-picker'
import styled from 'styled-components';

const Title = styled.h5`
  margin-bottom: 1rem;
  color: #333740;
`;

const IconPicker = (props) => {
  const [icon, setIcon] = useState(props.value);

  const updateIconValue = (iconValue) => {
    props.onChange({ target: { name: 'icon', value: iconValue } });
  };

  useEffect(() => {
    if (props.value) {
      setIcon(props.value);
    }
  }, [props.value]);

  const handleChangeComplete = (icon) => {
    setIcon(icon);
    updateIconValue(icon);
    setShowPicker(false);
  };

  return (
    <div>
      <Title>Icon</Title>
      <Picker value={icon} onChange={handleChangeComplete} />
    </div>
  );
};

export default IconPicker;