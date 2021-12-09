import { Input } from '@chakra-ui/input';
import { Flex, Text } from '@chakra-ui/layout';

function CustomInput({ error, placeholder, name, value, onChange, type, required }) {
    return (
        <Flex direction="column"  >
            <Input
                placeholder={placeholder}
                size='md'
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                borderColor={true ? "red" : "inherit"}
                isRequired={required}
            />
            <Text color="red.400" fontSize="14px" >{error}</Text>
        </Flex>
    );
}

export default CustomInput;