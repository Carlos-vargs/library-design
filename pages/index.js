import { Fragment, useEffect, useState } from 'react'
import Layout from '@components/layout/Layout'
import axios from 'axios';
import BookCard from '@components/BookCard';
import { Center, Flex } from '@chakra-ui/layout';
import SearchBar from '@components/SearchBar';
import Categories from '@components/Categories';
import { Spinner } from '@chakra-ui/spinner';
import { nanoid } from 'nanoid';

export default function Home() {

    const authrosUrl = "http://localhost:8000/api/authors"
    const BooksUrl = "http://localhost:8000/api/books"

    const [data, setData] = useState({
        loading: true,
        error: null,
        books: [],
        formBook: {
            title: "",
            category: "",
            group: "",
            author_id: "",
            language: "",
            year: "",
            description: "",
        },
        search: "",
    });

    const [filterByCategory, setFilter] = useState("")

    useEffect(() => {
        fetchBooks()
    }, [])

    const handleChange = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    async function fetchBooks() {
        setData({ ...data })

        try {
            const response = await axios.get(BooksUrl)

            setData({
                loading: false,
                error: null,
                books: response.data.data,
                search: "",
            })

        } catch (error) {
            setData({
                loading: false,
                error: error,
                search: "",
            })
        }

    }

    if (data.error) console.error(`Error: ${data.error.message}`);

    if (data.loading) {
        return (
            <Flex h="100vh" w="full" justifyContent="center" alignItems="center">
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="#4886B5"
                    size="xl"
                />
            </Flex>
        )
    };

    // const categories = [
    //     "sciFi",
    //     "thriller",
    //     "biographies",
    //     "mystery",
    //     "romance",
    //     "comedy",
    //     "classics",
    //     "shorts",
    //     "kids",
    //     "adventure",
    //     "comics",
    //     "fantasy",
    // ]

    const dataCategory = []

    data.books.forEach(e => {
        dataCategory.push(e.category)
    });

    let categories = dataCategory.filter((item, index) => {
        return dataCategory.indexOf(item) === index;
    })

    const filteredData = data.books.filter(e => filterByCategory !== "" ? e.category === filterByCategory : e);

    return (
        <Fragment>
            <Layout>
                <Flex
                    w="full"
                    mx="auto"
                    pb="200px"
                    pt="140px"
                    maxW="1520px"
                    direction="column"
                    alignItems="center"
                // bgColor="#F7F6F9"
                >
                    <SearchBar
                        onChange={handleChange}
                        search={data.search}
                    />
                    <Categories
                        data={categories}
                        setFilter={setFilter}
                    />
                    <Center
                        gridColumnGap="30px"
                        gridRowGap="60px"
                        flexWrap="wrap"
                        pt="60px"
                        px={['30px', '30px', '40px', '60px', '60px']}

                    >
                        {
                            data.books.length === 0 && "There are no books, do you want to create one?"
                        }
                        {
                            
                            filteredData.map(e => <BookCard key={nanoid()} data={e} />)
                        }
                    </Center>


                </Flex>
            </Layout>
        </Fragment>
    );
}
