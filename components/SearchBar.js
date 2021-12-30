import axios from 'axios';
import logo from '@images/logo1.png';
import PlusIcon from '@icons/PlusIcon';
import { Input } from '@chakra-ui/input';
import { Image } from '@chakra-ui/image';
import FormBook from '@components/FormBook';
import FormBook2 from '@components/FormBook2';
import FormAuthor from '@components/FormAuthor';
import React, { useState, useMemo } from 'react';
import { Box, Center, Flex, Heading } from '@chakra-ui/layout';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';

const idioms = [
    { value: "aa", language: "afar" },
    { value: "ab", language: "abjasio (o abjasiano)" },
    { value: "ae", language: "avéstico" },
    { value: "af", language: "afrikáans" },
    { value: "ak", language: "akano" },
    { value: "am", language: "amhárico" },
    { value: "an", language: "aragonés" },
    { value: "ar", language: "árabe" },
    { value: "as", language: "asamés" },
    { value: "av", language: "avar (o ávaro)" },
    { value: "ay", language: "aimara" },
    { value: "az", language: "azerí" },
    { value: "ba", language: "baskir" },
    { value: "be", language: "bielorruso" },
    { value: "bg", language: "búlgaro" },
    { value: "bh", language: "bhoyapurí" },
    { value: "bi", language: "bislama" },
    { value: "bm", language: "bambara" },
    { value: "bn", language: "bengalí" },
    { value: "bo", language: "tibetano" },
    { value: "br", language: "bretón" },
    { value: "bs", language: "bosnio" },
    { value: "ca", language: "catalán" },
    { value: "ce", language: "checheno" },
    { value: "ch", language: "chamorro" },
    { value: "co", language: "corso" },
    { value: "cr", language: "cree" },
    { value: "cs", language: "checo" },
    { value: "cu", language: "eslavo eclesiástico antiguo" },
    { value: "cv", language: "chuvasio" },
    { value: "cy", language: "galés" },
    { value: "da", language: "danés" },
    { value: "de", language: "alemán" },
    { value: "dv", language: "maldivo (o dhivehi)" },
    { value: "dz", language: "dzongkha" },
    { value: "ee", language: "ewé" },
    { value: "el", language: "griego (moderno)" },
    { value: "en", language: "inglés" },
    { value: "eo", language: "esperanto" },
    { value: "es", language: "español (o castellano)" },
    { value: "et", language: "estonio" },
    { value: "eu", language: "euskera" },
    { value: "fa", language: "persa" },
    { value: "ff", language: "fula" },
    { value: "fi", language: "finés (o finlandés)" },
    { value: "fj", language: "fiyiano (o fiyi)" },
    { value: "fo", language: "feroés" },
    { value: "fr", language: "francés" },
    { value: "fy", language: "frisón (o frisio)" },
    { value: "ga", language: "irlandés (o gaélico)" },
    { value: "gd", language: "gaélico escocés" },
    { value: "gl", language: "gallego" },
    { value: "gn", language: "guaraní" },
    { value: "gu", language: "guyaratí (o gujaratí)" },
    { value: "gv", language: "manés (gaélico manés o de Isla de Man)" },
    { value: "ha", language: "hausa" },
    { value: "he", language: "hebreo" },
    { value: "hi", language: "hindi (o hindú)" },
    { value: "ho", language: "hiri motu" },
    { value: "hr", language: "croata" },
    { value: "ht", language: "haitiano" },
    { value: "hu", language: "húngaro" },
    { value: "hy", language: "armenio" },
    { value: "hz", language: "herero" },
    { value: "ia", language: "interlingua" },
    { value: "id", language: "indonesio" },
    { value: "ie", language: "occidental" },
    { value: "ig", language: "igbo" },
    { value: "ii", language: "yi de Sichuán" },
    { value: "ik", language: "iñupiaq" },
    { value: "io", language: "ido" },
    { value: "is", language: "islandés" },
    { value: "it", language: "italiano" },
    { value: "iu", language: "inuktitut (o inuit)" },
    { value: "ja", language: "japonés" },
    { value: "jv", language: "javanés" },
    { value: "ka", language: "georgiano" },
    { value: "kg", language: "kongo (o kikongo)" },
    { value: "ki", language: "kikuyu" },
    { value: "kj", language: "kuanyama" },
    { value: "kk", language: "kazajo (o kazajio)" },
    { value: "kl", language: "groenlandés (o kalaallisut)" },
    { value: "km", language: "camboyano (o jemer)" },
    { value: "kn", language: "canarés" },
    { value: "ko", language: "coreano" },
    { value: "kr", language: "kanuri" },
    { value: "ks", language: "cachemiro (o cachemir)" },
    { value: "ku", language: "kurdo" },
    { value: "kv", language: "komi" },
    { value: "kw", language: "córnico" },
    { value: "ky", language: "kirguís" },
    { value: "la", language: "latín" },
    { value: "lb", language: "luxemburgués" },
    { value: "lg", language: "luganda" },
    { value: "li", language: "limburgués" },
    { value: "ln", language: "lingala" },
    { value: "lo", language: "lao" },
    { value: "lt", language: "lituano" },
    { value: "lu", language: "luba-katanga (o chiluba)" },
    { value: "lv", language: "letón" },
    { value: "mg", language: "malgache (o malagasy)" },
    { value: "mh", language: "marshalés" },
    { value: "mi", language: "maorí" },
    { value: "mk", language: "macedonio" },
    { value: "ml", language: "malayalam" },
    { value: "mn", language: "mongol" },
    { value: "mr", language: "maratí" },
    { value: "ms", language: "malayo" },
    { value: "mt", language: "maltés" },
    { value: "my", language: "birmano" },
    { value: "na", language: "nauruano" },
    { value: "nb", language: "noruego bokmål" },
    { value: "nd", language: "ndebele del norte" },
    { value: "ne", language: "nepalí" },
    { value: "ng", language: "ndonga" },
    { value: "nl", language: "neerlandés (u holandés)" },
    { value: "nn", language: "nynorsk" },
    { value: "no", language: "noruego" },
    { value: "nr", language: "ndebele del sur" },
    { value: "nv", language: "navajo" },
    { value: "ny", language: "chichewa" },
    { value: "oc", language: "occitano" },
    { value: "oj", language: "ojibwa" },
    { value: "om", language: "oromo" },
    { value: "or", language: "oriya" },
    { value: "os", language: "osético (u osetio, u oseta)" },
    { value: "pa", language: "panyabí (o penyabi)" },
    { value: "pi", language: "pali" },
    { value: "pl", language: "polaco" },
    { value: "ps", language: "pastú (o pastún, o pashto)" },
    { value: "pt", language: "portugués" },
    { value: "qu", language: "quechua" },
    { value: "rm", language: "romanche" },
    { value: "rn", language: "kirundi" },
    { value: "ro", language: "rumano" },
    { value: "ru", language: "ruso" },
    { value: "rw", language: "ruandés (o kiñaruanda)" },
    { value: "sa", language: "sánscrito" },
    { value: "sc", language: "sardo" },
    { value: "sd", language: "sindhi" },
    { value: "se", language: "sami septentrional" },
    { value: "sg", language: "sango" },
    { value: "si", language: "cingalés" },
    { value: "sk", language: "eslovaco" },
    { value: "sl", language: "esloveno" },
    { value: "sm", language: "samoano" },
    { value: "sn", language: "shona" },
    { value: "so", language: "somalí" },
    { value: "sq", language: "albanés" },
    { value: "sr", language: "serbio" },
    { value: "ss", language: "suazi (o swati, o siSwati)" },
    { value: "st", language: "sesotho" },
    { value: "su", language: "sundanés (o sondanés)" },
    { value: "sv", language: "sueco" },
    { value: "sw", language: "suajili" },
    { value: "ta", language: "tamil" },
    { value: "te", language: "télugu" },
    { value: "tg", language: "tayiko" },
    { value: "th", language: "tailandés" },
    { value: "ti", language: "tigriña" },
    { value: "tk", language: "turcomano" },
    { value: "tl", language: "tagalo" },
    { value: "tn", language: "setsuana" },
    { value: "to", language: "tongano" },
    { value: "tr", language: "turco" },
    { value: "ts", language: "tsonga" },
    { value: "tt", language: "tártaro" },
    { value: "tw", language: "twi" },
    { value: "ty", language: "tahitiano" },
    { value: "ug", language: "uigur" },
    { value: "uk", language: "ucraniano" },
    { value: "ur", language: "urdu" },
    { value: "uz", language: "uzbeko" },
    { value: "ve", language: "venda" },
    { value: "vi", language: "vietnamita" },
    { value: "vo", language: "volapük" },
    { value: "wa", language: "valón" },
    { value: "wo", language: "wolof" },
    { value: "xh", language: "xhosa" },
    { value: "yi", language: "yídish (o yidis, o yiddish)" },
    { value: "yo", language: "yoruba" },
    { value: "za", language: "chuan (o chuang, o zhuang)" },
    { value: "zh", language: "chino" },
    { value: "zu", language: "zulú" },
]

function getIdioms() {
    return idioms
}

function SearchBar({ search, onChange, onSubmit, authors, setNewAuthor, setNewBook }) {

    const booksUrl = "http://localhost:8000/api/books"
    const autohrsUrl = "http://localhost:8000/api/authors"

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