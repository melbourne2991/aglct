import React from "react";
import { Box, BoxProps } from "rebass";

interface ListItem {
  value: string;
  key: string;
}

interface ListProps extends BoxProps {
  items: ListItem[];
  headerText: string;
}

export const List = ({ items, headerText, id }: ListProps) => {
  return (
    <Box pb="3" id={id}>
      <Box as="h2">{headerText}</Box>

      <Box as="ul">
        {items.map((item) => (
          <Box as="li" key={item.key}>
            {item.value}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
