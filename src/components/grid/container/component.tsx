import React from 'react';

import { Layout } from 'src/components/core';
import { styled } from 'src/components/utils-styled-components';

const ScContainer = styled(Layout)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

interface Props {
  children: any;
}

export const Container: React.FC<Props> = () => {
  return <ScContainer breackpointLg={{ width: '1200px' }} />;
};
