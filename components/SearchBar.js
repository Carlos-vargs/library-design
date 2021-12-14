import axios from 'axios';
import logo from '@images/logo1.png';
import PlusIcon from '@icons/PlusIcon';
import { Input } from '@chakra-ui/input';
import { Image } from '@chakra-ui/image';
import { Fragment, useState, useEffect } from 'react';
import FormBook from '@components/FormBook';
import FormBook2 from '@components/FormBook2';
import FormAuthor from '@components/FormAuthor';
import { Box, Center, Flex, Heading } from '@chakra-ui/layout';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';

function SearchBar({ search, onChange, setData, data, onKeyDown }) {

    const BooksUrl = "http://localhost:8000/api/books"
    const AutohrsUrl = "http://localhost:8000/api/authors"

    const [isOpen, setOpen] = useState(false)
    const [next, setNext] = useState(1);


    const [state, setState] = useState({
        loading: false,
        error: null,
        newAuthor: {},
        authors: [],
        form: {
            title: "",
            cover_url: "",
            category: "",
            group: "",
            author_id: "",
            language: "",
            year: "",
            description: "",
        },
        formAuthor: {
            first_name: "",
            last_name: "",
            nationality: "",
        }
    });

    const handleChange = e => {
        setState({
            ...state,
            form: {
                ...state.form,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleChangeAuthorForm = e => {
        setState({
            ...state,
            formAuthor: {
                ...state.formAuthor,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleClick = () => {

        if (isOpen) {
            setOpen(false)
            setState({
                ...state, form: {
                    title: "",
                    cover_url: "",
                    category: "",
                    group: "",
                    author_id: "",
                    language: "",
                    year: "",
                    description: "",
                },
                formAuthor: {
                    first_name: "",
                    last_name: "",
                    nationality: "",
                }
            })
        } else {
            setOpen(true)
            setNext(1)
        }

    };

    const handleSubmit = async e => {

        setState({ ...state, loading: true, })

        e.preventDefault()

        try {

            const response = await axios.post(BooksUrl, state.form)

            if (response.status === 201) {
                setOpen(false)
                setState({
                    ...state, form: {
                        title: "",
                        cover_url: "",
                        category: "",
                        group: "",
                        author_id: "",
                        language: "",
                        year: "",
                        description: "",
                    }
                })
            };

            setData({ ...data, newBook: response.data })


        } catch (error) {

            console.error(error.response)
            console.error(error.response.data.errors)

            setState({ ...state, error: error.response.data.errors, })

        }
    }

    const handleSubmitFormAuthor = async e => {

        setState({ ...state, loading: true, })

        e.preventDefault()


        try {

            const response = await axios.post(AutohrsUrl, state.formAuthor)

            if (response.status === 201) {

                setState({
                    ...state, formAuthor: {
                        first_name: "",
                        last_name: "",
                        nationality: "",
                    }, newAuthor: response.data.data
                })
                setNext(2)
            };


        } catch (error) {

            console.error(error.response)
            console.error(error.response.data.errors)

            setState({ ...state, error: error.response.data.errors, })

        }
    }

    async function fetchAuthors() {

        setState({ ...state })

        try {

            const response = await axios.get(AutohrsUrl)

            setState({
                ...state,
                authors: response.data.data,
            })

        } catch (error) {
            setState({
                ...state,
                error: error,
            })
        }
    }

    useEffect(() => {
        fetchAuthors()
    }, [state.newAuthor]);

    const dataForms = [
        {
            title: "author",
            form: [
                <FormAuthor
                    onChange={handleChangeAuthorForm}
                    values={state.formAuthor}
                    onSubmit={handleSubmitFormAuthor}
                    setNext={setNext}
                    setState={setState}
                    state={state}
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
                    setNext={setNext}
                    onClick={handleClick}
                    key="formBook"
                />,
            ]
        },
        {
            title: "book",
            form: [
                < FormBook2
                    onChange={handleChange}
                    values={state.form}
                    setPrevious={setNext}
                    onClick={handleClick}
                    authors={state.authors}
                    key="formBook2"
                />,
            ]
        },

    ]

    console.log(state.newAuthor)

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
                        name="search"
                        value={search}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
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
                            {
                                next === 0
                                    ? <Flex
                                        as="form" onSubmit={handleSubmitFormAuthor}
                                    >
                                        {
                                            dataForms[next].form
                                        }
                                    </Flex>
                                    : <Flex
                                        as="form" onSubmit={handleSubmit}
                                    >
                                        {
                                            dataForms[next].form
                                        }
                                    </Flex>
                            }

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