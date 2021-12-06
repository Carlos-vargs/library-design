import { Flex, Link } from '@chakra-ui/layout';
import React from 'react';

function NavHeader({ data }) {
    return (
        <Flex
            gridColumnGap="40px"
            display={['none', 'none', 'none', 'flex', 'flex']}
        >
            {
                data.map(e => <Link
                    aria-label={e.title}
                    href={e.url}
                    cursor="pointer"
                    fontWeight="500"
                    textTransform="capitalize"
                    fontSize="16px"
                    position="relative"
                    color="white"
                    key={e.id}
                    _after={{
                        content: `"●"`,
                        fontSize: "10px",
                        position: "absolute",
                        top: "24px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        transition: "all .3s ease-out",
                        opacity: "0"
                    }}
                    _hover={{
                        _after: { opacity: "1", }
                    }}
                    _focus={{
                        _after: { opacity: "1", }
                    }}
                >
                    {e.title}
                </Link>)
            }
        </Flex>
    );
}

export default NavHeader;