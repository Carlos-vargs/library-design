import { Image } from '@chakra-ui/image';
import { Flex, Heading, Text } from '@chakra-ui/layout';
import { Fragment } from 'react';

function BookCard({ data }) {

    const image = "https://i.pinimg.com/originals/2d/bb/11/2dbb11b8cedfbb4a639f1b384ee062d2.jpg"

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
                    src={image}
                    w="full"
                    h="340px"
                    backgroundSize="contain"
                />
                <Flex direction="column" alignItems="center">
                    <Text as="span" fontSize="12px" textTransform="uppercase" fontWeight="700" mb="8px" >{`${data.authors.first_name} ${data.authors.last_name}`}</Text>
                    <Heading fontWeight="700" fontSize="20px" textTransform="capitalize" px="24px" >{data.title}</Heading>
                </Flex>
            </Flex>
        </Fragment>
    );
}

export default BookCard;