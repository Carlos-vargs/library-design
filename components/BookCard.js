import { Image } from '@chakra-ui/image';
import { Flex, Heading, Text } from '@chakra-ui/layout';
import { Fragment } from 'react';

function BookCard({ data }) {

    return (
        <Fragment>
            <Flex
                h="auto"
                pb="36px"
                gridGap="20px"
                cursor="pointer"
                overflow="hidden"
                textAlign="center"
                direction="column"
                borderRadius="20px"
                alignItems="center"
                position="relative"
                transition="all .6s ease"
                border="1px solid #0000001a"
                _hover={{ boxShadow: "lg" }}
                w={['280px', '280px', '270px', '270px', '280px']}
            >
                <Image
                    src={data.image}
                    w="full"
                    h="340px"
                    backgroundSize="contain"
                />
                <Flex direction="column" alignItems="center">
                    <Text as="span" fontSize="12px" textTransform="uppercase" fontWeight="700" mb="8px" >{`${data.authors.first_name} ${data.authors.last_name}`}</Text>
                    <Heading
                        className="line-clamp"
                        fontWeight="700"
                        fontSize="20px"
                        textTransform="capitalize"
                        px="24px"
                        title={data.title}
                        textOverflow="ellipsis"
                    >
                        {data.title}
                    </Heading>
                </Flex>
            </Flex>
        </Fragment>
    );
}

export default BookCard;