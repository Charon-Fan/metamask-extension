import React from 'react';
import { Flex, Text, Button, Select, Checkbox } from '@radix-ui/themes';
import { AccountListItem } from '../../multichain';

export const RadixCheckbox = () => {
  return (
    <Flex direction="column" gap="2">
      <Text>Hello from Radix Themes :)</Text>
      <Checkbox aria-readonly />
      <label>
        <Checkbox mr="1" defaultChecked /> Agree to Terms and Conditions
      </label>
    </Flex>
  );
};

export const RadixSelect = () => {
  return (
    <Flex direction="column" gap="2">
      <Text>Hello from Radix Themes :)</Text>
      <Button>Let's go</Button>
      <Select.Root>
        <Select.Trigger placeholder="Select a fruit…" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Accounts</Select.Label>
            <Select.Item value="0xb19ac54efa18cc3a14a5b821bfec73d284bf0c5e">
              <AccountListItem
                identity={{
                  address: '0xb19ac54efa18cc3a14a5b821bfec73d284bf0c5e',
                  balance: '0x152387ad22c3f0',
                  name: 'Account 2',
                }}
              />
            </Select.Item>
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="grape" disabled>
              Grape
            </Select.Item>
          </Select.Group>
          <Select.Separator />
          <Select.Group>
            <Select.Label>Vegetables</Select.Label>
            <Select.Item value="carrot">Carrot</Select.Item>
            <Select.Item value="potato">Potato</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};
