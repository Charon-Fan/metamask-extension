import React from 'react';
import { Select } from '@chakra-ui/react';
import { AccountListItem, AccountPicker } from '../../multichain';

export const ReactSelect = () => {
  return (
    <Select placeholder="Select option">
      <option value="option1">
        <AccountListItem
          identity={{
            address: '0xb19ac54efa18cc3a14a5b821bfec73d284bf0c5e',
            balance: '0x152387ad22c3f0',
            name: 'Account 2',
          }}
        />
      </option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </Select>
  );
};
