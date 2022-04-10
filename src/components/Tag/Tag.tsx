import React from 'react';
import { Tag as TagType } from '../../store/models';
import TagIcon, { TagIconLabel } from '../icons/TagIcon';

interface Props {
  tag?: TagType;
}
const Tag: React.FC<Props> = ({ tag }) => {
  const [labelVisible, setLabelVisible] = React.useState(false);
  return (
    <TagIcon
      tag={tag}
      onMouseEnter={() => setLabelVisible(true)}
      onMouseLeave={() => setLabelVisible(false)}
    >
      {labelVisible && <TagIconLabel text={tag?.name}>{tag?.name}</TagIconLabel>}
    </TagIcon>
  );
};

export default Tag;
