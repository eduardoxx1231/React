import React from 'react';
import { Stack } from 'react-bootstrap';

const WordsList = ({
  children,
  onClick,
}: {
  children: any;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <Stack direction="vertical" gap={4} onClick={onClick}>
      {children}
    </Stack>
  );
};

export default WordsList;
