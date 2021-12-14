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
    const searchUrl = "http://localhost:8000/api/search"
    const BooksCategoryUrl = "http://localhost:8000/api/books/category"
    const categoryUrl = "http://localhost:8000/api/category"

    let filteredData;

    const [data, setData] = useState({
        loading: true,
        error: null,
        books: [],
        categories:[],
        search: "",
        newBook: {},
    });

    const [filterCategory, setFilterCategory] = useState(null)
    const [lookingForData, setLookingForData] = useState(false)
    const [listOfCategories, setCategory] = useState([])

    useEffect(() => {

        fetchBooks()

         fetchCategories()

        if (filterCategory) {
            filterByCategory()
        }

        if (lookingForData) {
            search()
        }

    }, [filterCategory, lookingForData, data.newBook])


    const handleChange = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    function handleKeyDown(e) {
        if (e.keyCode === 13) {
            setLookingForData(true)
        }
    }

    async function filterByCategory() {
        setData({ ...data })

        try {

            const response = await axios.get(BooksCategoryUrl, { params: { filter: filterCategory } })

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

    async function search() {

        setData({ ...data })

        try {

            const response = await axios.get(searchUrl, { params: { filter: data.search } })

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

    async function fetchCategories() {
        
        try {
            const response = await axios.get(categoryUrl)

            setCategory(response.data.data)

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

    listOfCategories.forEach(e => {
        dataCategory.push(e.category)
    });

    let categories = dataCategory.filter((item, index) => {
        return dataCategory.indexOf(item) === index;
    })

    filteredData = data.books

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
                        onKeyDown={handleKeyDown}
                    />
                    <Categories
                        data={categories}
                        setFilterCategory={setFilterCategory}
                    />
                    <Center
                        gridColumnGap="30px"
                        gridRowGap="60px"
                        flexWrap="wrap"
                        pt="60px"
                        px={['30px', '30px', '40px', '60px', '60px']}

                    >
                        {
                            filteredData.length !== 0
                                ? filteredData.map(e => <BookCard key={nanoid()} data={e} />)
                                : "There are no books, do you want to create one?"
                        }
                    </Center>


                </Flex>
            </Layout>
        </Fragment>
    );
}
