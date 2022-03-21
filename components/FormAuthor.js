import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Flex, Text } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import countries from 'public/countries.json'


function FormAuthor({ onChange, values, setNext, setFormAuthor, loading }) {

    return (
        <Flex
            px="20px"
            gridGap="30px"
            cursor="pointer"
            direction="column"
        >
            <Text as="span" textTransform="capitalize" >author</Text>
            <Input
                placeholder='First Name'
                size='md'
                type="text"
                required
                name={"first_name"}
                autoComplete={"given-name"}
                value={values.first_name}
                onChange={onChange}
            />
            <Input
                placeholder='Last Name'
                size='md'
                type="text"
                required
                name={"last_name"}
                autoComplete={"family-name"}
                value={values.last_name}
                onChange={onChange}
            />
            <Select
                placeholder='nationality'
                size='md'
                required
                name={"nationality"}
                value={values.nationality}
                onChange={onChange}
                textTransform="capitalize"
            >
                {
                    countries.map(e => <option key={nanoid()} value={e.value} >{e.country}</option>)
                }
            </Select>
            <Flex
                mt="25px"
                ml="auto"
                gridGap="12px"
            >
                <Button
                    maxW="100px"
                    w="full"
                    colorScheme='red'
                    textTransform="capitalize"
                    onClick={() => {
                        setNext(2)
                        setFormAuthor({
                            first_name: "",
                            last_name: "",
                            nationality: "",
                        })
                    }}
                >
                    cancel
                </Button>
                <Button
                    isLoading={loading}
                    loadingText="Submitting"
                    spinnerPlacement='end'
                    maxW="100px"
                    w="full"
                    colorScheme='blue'
                    textTransform="capitalize"
                    type="submit"
                >
                    create
                </Button>
            </Flex>
        </Flex>
    );
}

export default FormAuthor;