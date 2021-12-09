import { Center, Flex } from '@chakra-ui/layout';
import { nanoid } from 'nanoid';
import { Fragment } from 'react';

function Categories({ data, setFilter }) {


    function randomColor() {
        return 'hsla(' + (Math.random() * 360) + ', 100%, 85%, 1)';
    }

    return (
        <Fragment>
            <Flex
                pt="50px"
                w="full"
                justifyContent="center"
            >
                <Center
                    maxW="1520px"
                    w="full"
                    gridGap="16px"
                    flexWrap="wrap"
                    px={['30px', '30px', '40px', '60px', '70px']}
                    cursor="pointer"
                >
                    {
                        data.map(e => <Flex
                            key={nanoid()}
                            textTransform="capitalize"
                            bg={randomColor()}
                            borderRadius="3xl"
                            textAlign="center"
                            alignItems="center"
                            justifyContent="center"
                            h="52px"
                            w={['120px', '140px', '160px', '160px', '160px']}
                            userSelect="none"
                            color="hsl(0deg 0% 34%)"
                            onClick={() => setFilter(e)}
                        >
                            {e}
                        </Flex>)
                    }
                </Center>
            </Flex>
        </Fragment>
    );
}

export default Categories;