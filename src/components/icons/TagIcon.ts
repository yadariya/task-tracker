import styled from 'styled-components';
import { Tag } from '../../store/models';

interface Props {
  tag?: Tag;
}

const TagIcon = styled.div<Props>`
  border-radius: 90%;
  height: 20px;
  width: 20px;
  background-color: ${(props) => props.tag?.color};
  position: relative;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 15px;
  }
`;

interface LabelProps {
  text?: string;
}

export const TagIconLabel = styled.div<LabelProps>`
  position: absolute;
  padding: 5px;
  bottom: 20px;
  font-size: 15px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  pointer-events: none;
`;

export default TagIcon;
