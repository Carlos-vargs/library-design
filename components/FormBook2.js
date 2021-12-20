import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Textarea } from '@chakra-ui/textarea';
import { Select } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import PlusIcon from '@icons/PlusIcon';


function FormBook2({ onChange, values, setPrevious, authors = [], idioms = [] }) {

    return (
        <Flex
            px="20px"
            gridGap="26px"
            cursor="pointer"
            direction="column"
            w="full"
        >
            <Text as="span" textTransform="capitalize" >Book</Text>
            <Flex
                gridGap="20px"
                direction={['column', 'row', 'row', 'row', 'row']}
            >
                <Input
                    placeholder='Year'
                    size='md'
                    type="number"
                    required
                    name={"year"}
                    value={values.year}
                    onChange={onChange}
                />
                <Select
                    placeholder='Language'
                    size='md'
                    required
                    name={"language"}
                    value={values.language}
                    onChange={onChange}
                    textTransform="capitalize"
                >
                    {
                        idioms.map(e => <option key={nanoid()} value={e.value} >{e.language}</option>)
                    }
                </Select>

            </Flex>
            <Flex
                gridGap="20px"
                direction="row"
                alignItems="center"
            >
                <Select
                    placeholder='Author'
                    size='md'
                    required
                    name={"author_id"}
                    value={values.author_id}
                    onChange={onChange}
                    textTransform="capitalize"
                >
                    {
                        authors.map(e => <option key={nanoid()} value={e.id}  >{`${e.first_name} ${e.last_name}`}</option>)
                    }
                </Select>
                <Box
                    p="6px"
                    w="36px"
                    h="36px"
                    minW="36px"
                    color="#ffff"
                    cursor="pointer"
                    bgColor="#4886B5"
                    borderRadius="full"
                    title="create new author"
                    transition="all .2s ease-in"
                    _hover={{
                        backgroundColor: "#3D749D"
                    }}
                    onClick={() => setPrevious(0)}

                >
                    <PlusIcon />
                </Box>
            </Flex>
            <Textarea
                placeholder='Description'
                name={"description"}
                value={values.description}
                onChange={onChange}
            />
            <Flex
                ml={['0', '0', 'auto', 'auto', 'auto']}
                justifyContent={['flex-end', 'flex-end', 'flex-end', 'space-between', 'space-between',]}
                gridGap="12px"
            >
                <Button
                    maxW="100px"
                    colorScheme='blue'
                    textTransform="capitalize"
                    onClick={() => setPrevious(1)}
                >
                    previous
                </Button>
                <Button
                    maxW="100px"
                    colorScheme='blue'
                    textTransform="capitalize"
                    type="submit"
                >
                    submit
                </Button>
            </Flex>
        </Flex>
    );
}

export default FormBook2;