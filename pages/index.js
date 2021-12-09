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

    const BooksUrl = "http://localhost:8000/api/books"

    const [data, setData] = useState({
        loading: true,
        error: null,
        books: [],
        search: "",
        newBook: {},
    });

    const [filterByCategory, setFilter] = useState("")

    useEffect(() => {
        fetchBooks()
    }, [data.newBook])

    const handleChange = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    async function fetchBooks() {
        setData({ ...data })

        try {
            const response = await axios.get(BooksUrl)

            setData({
                ...data, loading: false,
                books: response.data.data,
            })

        } catch (error) {
            setData({
                ...data,
                loading: false,
                error: error,
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

    const dataCategory = []

    data.books.forEach(e => {
        dataCategory.push(e.category)
    });

    let categories = dataCategory.filter((item, index) => {
        return dataCategory.indexOf(item) === index;
    })

    let filterA = data.books.filter(e => filterByCategory !== "" ? e.category === filterByCategory : e);

    let filteredData = filterA

    let inputSearch = data.books.filter(e => {

        let fullName = `${e.authors.first_name} ${e.authors.last_name}`
        let group = e.group
        let title = e.title
        let text = data.search.toLowerCase()

        if (group !== null) {
            if (group.toLowerCase().indexOf(text) !== -1) {
                return e
            }
        }

        if (fullName.toLowerCase().indexOf(text) !== -1) {
            return e
        }

        if (title.toLowerCase().indexOf(text) !== -1) {
            return e
        }

    });

    if (filterByCategory === "") filteredData = inputSearch;

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
                >
                    <SearchBar
                        onChange={handleChange}
                        search={data.search}
                        setData={setData}
                        data={data}
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
