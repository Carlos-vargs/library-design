import axios from 'axios';
import PlusIcon from '@icons/PlusIcon';
import { Input } from '@chakra-ui/input';
import { Fragment, useState } from 'react';
import FormAuthor from '@components/FormAuthor';
import { Box, Center, Flex, Heading } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import logo from '@images/logo1.png';
import FormBook from '@components/FormBook';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';

function SearchBar({ search, onChange, }) {

    const BooksUrl = "http://localhost:8000/api/book"

    const [isOpen, setOpen] = useState(false)
    const [next, setNext] = useState(0);


    const [state, setState] = useState({
        loading: false,
        error: null,
        form: {
            first_name: "",
            last_name: "",
            nationality: "",
            title: "",
            category: "",
            group: "",
            author_id: 0,
            language: "",
            year: "",
            description: "",
        },
    });

    const handleChange = e => {
        setState({
            form: {
                ...state.form,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = async e => {

        setState({ ...state, loading: true, })

        e.preventDefault()

        try {

            const response = await axios.post(BooksUrl, state.form)

            console.log(response.data)

            if (response.status) setOpen(false);

            setState({ ...state })


        } catch (error) {

            console.error(error.response.status)
            console.error(error.response.data.errors)

            setState({ ...state, error: error.response.data.errors, })

        }
    }

    function handleClick() {
        isOpen
            ? setOpen(false)
            : setOpen(true)
    }

    const dataForms = [
        {
            title: "author",
            form: [
                <FormAuthor
                    onChange={handleChange}
                    values={state.form}
                    setNext={setNext}
                    key="formAuthor"
                />
            ]
        },
        {
            title: "book",
            form: [
                < FormBook
                    onChange={handleChange}
                    values={state.form}
                    setPrevious={setNext}
                    onClick={handleClick}
                    key="formBook"
                />
            ]
        },

    ]

    return (
        <Fragment>
            <Flex
                w="full"
                px="20px"
                alignItems="center"
                justifyContent="center"
            >
                <Center
                    w="full"
                    px="20px"
                    maxW="500px"
                >
                    <Input
                        type="text"
                        size='lg'
                        borderRadius="xl"
                        placeholder='Search'
                        // shadow="xl"
                        // borderColor="transparent"
                        name="search"
                        value={search}
                        onChange={onChange}
                    />
                </Center>
                <Box
                    p="6px"
                    w="40px"
                    h="40px"
                    minW="40px"
                    color="#ffff"
                    cursor="pointer"
                    bgColor="#4886B5"
                    borderRadius="full"
                    title="create new book"
                    transition="all .2s ease-in"
                    _hover={{
                        backgroundColor: "#3D749D"
                    }}
                    onClick={handleClick}
                >
                    <PlusIcon />
                </Box>
                <Modal isOpen={isOpen} onClose={handleClick}  >
                    <ModalOverlay />
                    <ModalContent my="auto !important" maxW="600px"  >
                        <ModalHeader textAlign="center">
                            <Image src={logo.src} w="100px" mx="auto" />
                            <Heading as="h2" textTransform="capitalize" fontSize="20px" mt="20px" >{`create new ${dataForms[next].title}`}</Heading>
                        </ModalHeader>
                        <ModalCloseButton _focus={{ boxShadow: "none" }} />
                        <ModalBody textAlign="left" >
                            <Flex as="form" onSubmit={handleSubmit} >
                                {
                                    dataForms[next].form
                                }
                            </Flex>
                        </ModalBody>
                        <ModalFooter>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Flex>

        </Fragment>
    );
}

export default SearchBar;