import React, { FormEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import { ArrowDownIcon } from '../icons/ArrowIcon';
import { FlexRow } from '../Layout/Flexbox.styled';
import {
  DropdownStyled,
  DropdownHeaderStyled,
  DropdownListStyled,
  DropdownListItemStyled,
  DropdownListTickStyled,
} from './styled/Dropdown.styled';

interface DropdownProps {
  items: { [name: string]: string };
  header?: string;
  autoheader?: 'values' | 'count';
  setParentState: (ids: string[]) => void;
  initialState: string[];
}

const MultichoiceDropdown: React.FC<DropdownProps> = ({
  items,
  header,
  autoheader,
  setParentState,
  initialState,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [selected, setSelected] = useState<string[]>(initialState);

  // Open/close on field (aka header) click
  const handleHeaderClick: MouseEventHandler = (e) => {
    e.stopPropagation();
    setIsOpened(!isOpened);
  };

  // Change state on list toggles
  const handleListItemToggled: FormEventHandler = (e) => {
    const input = e.target as HTMLInputElement;
    const inputId = input.name;
    const newState = (
      input.checked
        ? Array.from(new Set([...selected, inputId]))
        : selected.filter((i) => i != inputId)
    ).sort();
    setSelected(newState);
    setParentState(newState);
  };

  // Update when parent state updates
  useEffect(() => {
    setSelected(initialState);
  }, [initialState]);

  // Close if clicked outside the component
  useEffect(() => {
    const close = () => setIsOpened(false);
    (async () =>
      isOpened
        ? window.addEventListener('click', close)
        : window.removeEventListener('click', close))();
  });

  return (
    <DropdownStyled onClick={handleHeaderClick}>
      <FlexRow justify="space-between" align="center" height="100%">
        <DropdownHeaderStyled>
          {autoheader === 'count'
            ? `${selected.length} selected`
            : autoheader === 'values'
            ? Object.entries(items)
                .filter(([_, slug]) => selected.includes(slug))
                .map(([name, _]) => name)
                .join(', ') || header
            : header}
        </DropdownHeaderStyled>
        <ArrowDownIcon />
      </FlexRow>
      {isOpened && (
        <DropdownListStyled>
          {Object.entries(items).map(([name, slug]) => (
            <DropdownListItemStyled key={slug} onClick={(e) => e.stopPropagation()}>
              <DropdownListTickStyled
                name={String(slug)}
                type="checkbox"
                onChange={handleListItemToggled}
                defaultChecked={selected.includes(slug)}
              />
              {name}
            </DropdownListItemStyled>
          ))}
        </DropdownListStyled>
      )}
    </DropdownStyled>
  );
};

export default MultichoiceDropdown;
