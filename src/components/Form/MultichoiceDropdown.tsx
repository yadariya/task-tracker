import React, { FormEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import { ArrowDownIcon } from '../icons/ArrowIcon';
import { FlexRow } from '../Layout/Flexbox.styled';
import {
  DropdownStyled,
  DropdownListStyled,
  DropdownListItemStyled,
  DropdownListTickStyled,
} from './styled/Dropdown.styled';

interface DropdownProps {
  items: { [name: string]: string };
  header?: string;
  autoheader?: 'values' | 'count';
  setParentState: (ids: string[]) => void;
}

const MultichoiceDropdown: React.FC<DropdownProps> = ({
  items,
  header,
  autoheader,
  setParentState,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const handleHeaderClick: MouseEventHandler = (e) => {
    e.stopPropagation();
    setIsOpened(!isOpened);
  };

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
        <div>
          {autoheader === 'count'
            ? `${selected.length} selected`
            : autoheader === 'values'
            ? Object.entries(items)
                .filter(([_, slug]) => selected.includes(slug))
                .map(([name, _]) => name)
                .join(', ') || header
            : header}
        </div>
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
