import React, { useEffect, useState } from 'react';
import Select, { components } from 'react-select';
import { Display } from '../../../helpers/constants/design-system';
import {
  AvatarAccount,
  AvatarAccountSize,
  Icon,
  IconSize,
  IconName,
  Popover,
  Box,
} from '..';
import { AccountListItem, AccountPicker } from '../../multichain';

const options = [
  {
    value: 'chocolate',
    label: 'Chocolate',
    address: '0xb19ac54efa18cc3a14a5b821bfec73d284bf0c5e',
    balance: 0,
  },
  {
    value: 'strawberry',
    label: 'Strawberry',
    address: '0xb194efa18cc3a14a5b821basdfasdff284bf0c5e',
    balance: 0,
  },
  {
    value: 'vanilla',
    label: 'Vanilla',
    address: '0xb19ac5asdfasdf14a5b821bfec73d284bf0asdfae',
    balance: 0,
  },
];

const CustomTrigger = ({ children, selectProps, ...props }) => {
  console.log('props', props);
  return (
    <components.Control {...props}>
      {selectProps.value && selectProps.value.label ? (
        <AccountPicker
          name={selectProps.value.label}
          address={selectProps.value.address}
        />
      ) : (
        <>
          {selectProps?.value?.label}
          <>{children}</>
        </>
      )}
    </components.Control>
  );
};

const CustomOption = ({ innerProps, isDisabled, label, data }) => {
  return !isDisabled ? (
    <div {...innerProps}>
      <AccountListItem
        key={data.address}
        identity={{
          address: data.address,
          balance: data.balance,
          name: label,
        }}
        onClick={() => console.log('clicked')}
      />
    </div>
  ) : null;
};

export const ReactSelect = () => {
  const [selectedOption, setSelectedOption] = React.useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  return (
    <Select
      placeholder="Select an account"
      value={selectedOption}
      onChange={handleChange}
      options={options}
      components={{ Control: CustomTrigger, Option: CustomOption }}
    />
  );
};

const SelectWrapper = ({
  TriggerComponent,
  children,
  onChange,
  value,
  placeholder,
}) => {
  const [referenceElement, setReferenceElement] = useState();
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOnChange = (selectedOption) => {
    onChange?.(selectedOption);
    // some context logic to update the selected option
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Example of how to use keyboard events to close popover with escape key
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  // Example of how to use ref to open popover
  const setBoxRef = (ref) => {
    setReferenceElement(ref);
  };

  return (
    <span>
      <TriggerComponent
        ref={setBoxRef}
        onClick={handleClick}
        {...value}
        label={value && value?.label ? value?.label : placeholder}
      />
      <Popover referenceElement={referenceElement} isOpen={isOpen}>
        {children}
      </Popover>
    </span>
  );
};

const SelectButton = React.forwardRef(
  ({ label, onClick, startAccessory, endAccessory, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        onClick={onClick}
        as="button"
        display={Display.Flex}
        gap={4}
        {...props}
      >
        {startAccessory && <>{startAccessory}</>}
        {label && <Text>{label}</Text>}
        {endAccessory && <>{endAccessory}</>}
        <Icon name={IconName.ArrowDown} size={IconSize.Sm} />
      </Box>
    );
  },
);

const SelectOption = ({ value, children, onClick }) => {
  const handleOnClick = () => {
    onClick?.(value);
    // some context logic to update the selected option
  };
  return (
    <Box onClick={onClick} role="option">
      {children}
    </Box>
  );
};

export const Example = () => {
  const [selectedOption, setSelectedOption] = React.useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  return (
    <SelectWrapper
      TriggerComponent={SelectButton}
      value={selectedOption}
      onChange={handleChange}
    >
      <SelectOption
        value={{
          value: 'account-1',
          label: 'Account 1',
          startAccessory: (
            <AvatarAccount
              size={AvatarAccountSize.Sm}
              address="0x129319042784102934"
            />
          ),
        }}
      >
        Account 1
      </SelectOption>
      <SelectOption
        value={{
          value: 'account-2',
          label: 'Account 2',
          startAccessory: (
            <AvatarAccount
              size={AvatarAccountSize.Sm}
              address="0x12931904278asdfasdf4102934"
            />
          ),
        }}
      >
        Account 2
      </SelectOption>
      <SelectOption
        value={{
          value: 'account-3',
          label: 'Account 3',
          startAccessory: (
            <AvatarAccount
              size={AvatarAccountSize.Sm}
              address="0x12931904278asdfasdf4102934"
            />
          ),
        }}
      >
        Account 3
      </SelectOption>
    </SelectWrapper>
  );
};
