import { Flex, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Fragment } from 'react';

function FormBook({ onChange, values, setNext }) {

    return (
        <Fragment>
            <Flex
                px="20px"
                gridGap="26px"
                cursor="pointer"
                direction="column"
                w="full"
            >
                <Text as="span" textTransform="capitalize" >Book</Text>
                <Input
                    placeholder='Title'
                    size='md'
                    required
                    name={"title"}
                    value={values.title}
                    onChange={onChange}
                />
                <Flex gridGap="20px" direction={['column', 'row', 'row', 'row', 'row']} >
                    <Input
                        placeholder='category'
                        size='md'
                        required
                        name={"category"}
                        value={values.category}
                        onChange={onChange}
                    />
                    <Input
                        placeholder='Group'
                        size='md'
                        name={"group"}
                        value={values.group}
                        onChange={onChange}
                    />
                </Flex>
                <Input
                    placeholder='url'
                    size='md'
                    required
                    name={"cover_url"}
                    value={values.cover_url}
                    onChange={onChange}
                />
                <Flex
                    ml={['0', '0', 'auto', 'auto', 'auto']}
                    justifyContent={['flex-end', 'flex-end', 'flex-end', 'space-between', 'space-between',]}
                    gridGap="12px"
                    mt="39px"
                >
                    <Button
                        maxW="100px"
                        colorScheme='blue'
                        textTransform="capitalize"
                        onClick={() => setNext(2)}
                    >
                        next
                    </Button>
                </Flex>
            </Flex>
        </Fragment>
    );
}

export default FormBook;