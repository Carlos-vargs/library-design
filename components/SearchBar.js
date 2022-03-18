import axios from 'axios';
import logo from '@images/logo1.png';
import PlusIcon from '@icons/PlusIcon';
import { Input } from '@chakra-ui/input';
import { Image } from '@chakra-ui/image';
import FormBook from '@components/FormBook';
import FormBook2 from '@components/FormBook2';
import FormAuthor from '@components/FormAuthor';
import { useState, useMemo } from 'react';
import { Box, Center, Flex, Heading } from '@chakra-ui/layout';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import idioms from 'public/idioms.json'

function getIdioms() {
    return idioms
}

function SearchBar({ search, onChange, onSubmit, authors, setNewAuthor, setNewBook }) {

    const booksUrl = `${process.env.API_HOST}/books`
    const autohrsUrl = `${process.env.API_HOST}/authors`

    const memoizedIdiomsValue = useMemo(() => getIdioms(), [])

    const [isOpen, setOpen] = useState(false)

    const [next, setNext] = useState(1);

    const [formBook, setFormBook] = useState({
        title: "",
        cover_url: "",
        category: "",
        group: "",
        author_id: "",
        language: "",
        year: "",
        description: "",
    })

    const [formAuthor, setFormAuthor] = useState({
        first_name: "",
        last_name: "",
        nationality: "",
    })

    const [state, setState] = useState({
        loading: false,
        error: null,
    });

    const handleChangeFormBook = e => {

        const { name, value } = e.target

        setFormBook({ ...formBook, [name]: value })

    }

    const handleChangeFormAuthor = e => {

        const { name, value } = e.target

        setFormAuthor({ ...formAuthor, [name]: value })

    }

    const handleClick = () => {

        if (isOpen) {

            setOpen(false)

            setFormBook({
                title: "",
                cover_url: "",
                category: "",
                group: "",
                author_id: "",
                language: "",
                year: "",
                description: "",
            })

            setFormAuthor({
                first_name: "",
                last_name: "",
                nationality: "",
            })

        } else {
            setOpen(true)
            setNext(1)
        }

    };

    const handleSubmitFormBook = async e => {

        e.preventDefault()

        setState({ ...state, loading: true, })

        try {

            const response = await axios.post(booksUrl, formBook)

            if (response.status === 201) {

                setNewBook(response.data.data)

                setOpen(false)

                setFormBook({
                    title: "",
                    cover_url: "",
                    category: "",
                    group: "",
                    author_id: "",
                    language: "",
                    year: "",
                    description: "",
                })


            };

        } catch (error) {

            setState({ ...state, error: error, })

        }
    }

    const handleSubmitFormAuthor = async e => {

        e.preventDefault()

        setState({ ...state, loading: true, })

        try {

            const response = await axios.post(autohrsUrl, formAuthor)

            if (response.status === 201) {

                setNewAuthor(response.data.data)

                setFormBook({ ...formBook, author_id: response.data.data.id })

                setFormAuthor({
                    first_name: "",
                    last_name: "",
                    nationality: "",
                })
                setNext(2)

            }

        } catch (error) {

            setState({ ...state, error: error })

        }
    }

    const dataForms = [
        {
            title: "author",
            form: [
                <FormAuthor
                    onChange={handleChangeFormAuthor}
                    setFormAuthor={setFormAuthor}
                    values={formAuthor}
                    setNext={setNext}
                    key="formAuthor"
                />
            ]
        },
        {
            title: "book",
            form: [
                < FormBook
                    onChange={handleChangeFormBook}
                    values={formBook}
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
                    onChange={handleChangeFormBook}
                    values={formBook}
                    idioms={memoizedIdiomsValue}
                    setPrevious={setNext}
                    onClick={handleClick}
                    authors={authors}
                    key="formBook2"
                />,
            ]
        },

    ]

    return (
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
                as="form"
                onSubmit={onSubmit}
            >
                <Input
                    type="text"
                    size='lg'
                    borderRadius="xl"
                    placeholder='Search'
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
                color="white"
                cursor="pointer"
                bgColor="blueColorButton"
                borderRadius="full"
                title="create new book"
                transition="all .2s ease-in"
                _hover={{
                    backgroundColor: "blueColorButtonHover"
                }}
                onClick={handleClick}
            >
                <PlusIcon />
            </Box>
            <Modal isOpen={isOpen} onClose={handleClick}  >
                <ModalOverlay />
                <ModalContent my="auto !important" maxW="600px"  >
                    <ModalHeader textAlign="center">
                        <Image src={logo.src} w="100px" mx="auto" alt={'cyber book'} />
                        <Heading as="h2" textTransform="capitalize" fontSize="20px" mt="20px" >{`create new ${dataForms[next].title}`}</Heading>
                    </ModalHeader>
                    <ModalCloseButton _focus={{ boxShadow: "none" }} />
                    <ModalBody textAlign="left" >
                        {
                            next === 0
                                ? <Flex as="form"
                                    onSubmit={handleSubmitFormAuthor}
                                >
                                    {
                                        dataForms[next].form
                                    }
                                </Flex>
                                : <Flex as="form"
                                    onSubmit={handleSubmitFormBook}
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
    );
}

export default SearchBar;