import React from 'react';
import { RadixSelect, RadixCheckbox } from './radix-select';
import { ReactSelect } from './react-select';
import { Example } from './select';
// import { ChakraSelect } from './chakra-ui-select';

export default {
  title: 'Components/ComponentLibrary/Select', // title should follow the folder structure location of the component. Don't use spaces.
};

export const RadixSelectStory = () => <RadixSelect />;
export const RadixCheckboxtory = () => <RadixCheckbox />;
export const ReactSelectStory = () => <ReactSelect />;

// export const ChakraSelectStory = () => <ChakraSelect />;

export const SelectStory = () => <Example />;
