import React from "react";
import { Global } from "@emotion/core";
import { Box, Flex } from "rebass";

const globalStyles = {
  body: {
    margin: 0,
    fontFamily: "Helvetica, sans-serif",
  },
};

export const Layout = ({ children }: React.PropsWithChildren<{}>) => (
  <>
    <Global styles={globalStyles} />
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      backgroundColor="rgba(0, 0, 0, 0.1)"
    >
      <Box
        flex={1}
        p={4}
        maxWidth="980px"
        backgroundColor="white"
        sx={{ borderRadius: 5 }}
      >
        {children}
      </Box>
    </Flex>
  </>
);
