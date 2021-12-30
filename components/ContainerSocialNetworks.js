import { Flex, Link } from '@chakra-ui/layout';

export default function ContainerSocialNetworks({ data, mtSize, gap }) {

    return (
        <Flex mt={mtSize} justifyContent="center" gridGap={gap}  >
            {
                data.map(e =>
                    <Link
                        key={e.id}
                        justifyContent="center"
                        alignItems="center"
                        transition="all .3s ease-out"
                        w="40px"
                        h="40px"
                        borderRadius="full"
                        color="white"
                        href={e.url}
                        display="flex"
                        isExternal
                        title={e.socialNetwork}
                        _hover={{
                            color: "white",
                            boxShadow: '0 0 0 2px white inset',
                        }}
                        _focus={{
                            color: "white",
                            boxShadow: '0 0 0 2px white inset',
                        }}
                    >
                        <Flex
                            pl={e.pl}
                            pt={e.pt}
                            w="20px"
                            h="20px"
                        >
                            {e.iconSvg}
                        </Flex>
                    </Link>
                )
            }
        </Flex>
    );
}