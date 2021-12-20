import axios from 'axios';
import { nanoid } from 'nanoid';
import Spinner from '@components/Spinner';
import { useEffect, useState } from 'react'
import BookCard from '@components/BookCard';
import SearchBar from '@components/SearchBar';
import Layout from '@components/layout/Layout'
import Categories from '@components/Categories';
import { Center, Flex } from '@chakra-ui/layout';

export default function Home() {

    const booksUrl = "http://localhost:8000/api/books"
    const categoryUrl = "http://localhost:8000/api/books/categories"
    const searchUrl = "http://localhost:8000/api/search"
    const autohrsUrl = "http://localhost:8000/api/authors"


    const [state, setState] = useState({
        loading: true,
        error: null,
    });

    const [search, setSearch] = useState("")
    const [books, setBooks] = useState([])
    const [authors, setAuthors] = useState([])
    const [newAuthor, setNewAuthor] = useState({ id: "" })
    const [newBook, setNewBook] = useState({ id: "", category: "" })

    const [filterCategory, setFilterCategory] = useState(null)
    const [listOfCategories, setCategories] = useState([])


    useEffect(() => {

        fetchBooks()

        fetchAuthors()

        fetchCategories()

    }, [])

    useEffect(() => {

        if (newAuthor.id !== "") {

            authors.push(newAuthor)

        }

        if (newBook.id !== "") {

            listOfCategories.push({ category: newBook.category })

            setBooks([...books, newBook])

            setNewBook({ id: "", category: "" })

        }

    }, [newAuthor, newBook])


    useEffect(() => {

        if (filterCategory !== null) {

            if (filterCategory === 'all') {
                fetchBooks()
            } else {
                filterByCategory()
            }

        }

    }, [filterCategory]);


    const handleChangeInputSearch = e => {

        const { value } = e.target

        setSearch(value)

    }

    const fetchDataSearch = async e => {

        e.preventDefault()

        if (search !== "") {
            try {

                const response = await axios.get(searchUrl, { params: { filter: search } })

                setState({ ...state, loading: false })
                setBooks(response.data.data)

            } catch (error) {
                setState({
                    loading: false,
                    error: error,
                })
            }
        }

    };

    async function filterByCategory() {

        try {

            const response = await axios.get(searchUrl, { params: { filter: filterCategory } })

            setState({ ...state, loading: false })
            setBooks(response.data.data)

        } catch (error) {
            setState({
                loading: false,
                error: error,
            })
        }

    }

    async function fetchBooks() {

        try {
            const response = await axios.get(booksUrl)

            setState({ ...state, loading: false })

            setBooks(response.data.data)

        } catch (error) {
            setState({
                loading: false,
                error: error,
            })
        }

    }

    async function fetchCategories() {

        try {
            const response = await axios.get(categoryUrl)

            setCategories(response.data.data)

        } catch (error) {
            setState({
                ...state,
                loading: false,
                error: error,
            })
        }

    }

    async function fetchAuthors() {

        try {

            const response = await axios.get(autohrsUrl)

            setAuthors(response.data.data)

        } catch (error) {
            setState({
                ...state,
                error: error,
            })
        }
    }

    if (state.error) {
        console.error(`Error: ${state.error.message}`)
    };

    if (state.loading) {
        return <Spinner />
    };

    const dataCategory = []

    listOfCategories.forEach(e => {
        dataCategory.push(e.category)
    });

    let categories = dataCategory.filter((item, index) => {
        return dataCategory.indexOf(item) === index
    })

    return (
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
                    search={search}
                    authors={authors}
                    setNewBook={setNewBook}
                    onSubmit={fetchDataSearch}
                    setNewAuthor={setNewAuthor}
                    onChange={handleChangeInputSearch}
                />
                <Categories
                    data={categories}
                    filterCategory={filterCategory}
                    setFilterCategory={setFilterCategory}
                />
                <Center
                    pt="60px"
                    flexWrap="wrap"
                    gridRowGap="60px"
                    gridColumnGap="30px"
                    px={['20px', '30px', '40px', '60px', '60px']}

                >
                    {
                        books.length !== 0
                            ? books.map(e => <BookCard key={nanoid()} data={e} />)
                            : <Flex textAlign="center" >There are no books, do you want to create one?</Flex>
                    }
                </Center>


            </Flex>
        </Layout>
    );
}
