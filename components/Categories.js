import { Center, Flex } from '@chakra-ui/layout';
import { nanoid } from 'nanoid';

const arrayColors = []

function randomColor() {

    let color = `hsla(${(Math.random() * 360).toFixed(0)}, 100%, 85%, 1)`;

    return color;
}


function Categories({ data = [], setFilterCategory }) {

    let colorsLength = data.length + 1

    if (colorsLength === 0) {
        colorsLength = 1
    }

    for (let index = 0; index < colorsLength; index++) {

        arrayColors.push(randomColor())

    }

    return (
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
                <Flex
                    textTransform="capitalize"
                    bg={arrayColors[0]}
                    borderRadius="3xl"
                    textAlign="center"
                    alignItems="center"
                    justifyContent="center"
                    h="52px"
                    w={['120px', '140px', '160px', '160px', '160px']}
                    userSelect="none"
                    color="hsl(0deg 0% 34%)"
                    onClick={() => setFilterCategory('all')}
                >
                    all
                </Flex>
                {
                    data.map((e, i) => <Flex
                        key={nanoid()}
                        textTransform="capitalize"
                        bg={arrayColors[i + 1]}
                        borderRadius="3xl"
                        textAlign="center"
                        alignItems="center"
                        justifyContent="center"
                        h="52px"
                        w={['120px', '140px', '160px', '160px', '160px']}
                        userSelect="none"
                        color="hsl(0deg 0% 34%)"
                        onClick={() => setFilterCategory(e)}
                    >
                        {e}
                    </Flex>)
                }
            </Center>
        </Flex>
    );
}

export default Categories;