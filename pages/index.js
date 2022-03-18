import axios from 'axios';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react'
import BookCard from '@components/BookCard';
import SearchBar from '@components/SearchBar';
import Layout from '@components/layout/Layout'
import Categories from '@components/Categories';
import { Center, Flex } from '@chakra-ui/layout';


export default function Home() {

    const booksUrl = `${process.env.API_HOST}/books`
    const categoryUrl = `${process.env.API_HOST}/books/categories`
    const searchUrl = `${process.env.API_HOST}/search`
    const autohrsUrl = `${process.env.API_HOST}/authors`

    const [search, setSearch] = useState("")
    const [books, setBooks] = useState([])
    const [authors, setAuthors] = useState([])
    const [newAuthor, setNewAuthor] = useState({ id: "" })
    const [newBook, setNewBook] = useState({ id: "", category: "" })

    const [filterCategory, setFilterCategory] = useState(null)
    const [categories, setCategories] = useState([])


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

            setSearch("")

            if (filterCategory === 'all') {
                fetchBooks()
            } else {
                fetchDataSearch()
            }
        }

    }, [filterCategory]);


    const handleChangeInputSearch = e => {

        const { value } = e.target

        setSearch(value)

    }

    async function fetchDataSearch(e) {

        e && e.preventDefault()

        try {

            const { data: { data: books } } = await axios.get(searchUrl, { params: { filter: search !== "" ? search : filterCategory } })

            setBooks(books)

        } catch (error) {
            console.error(error)
        }


    }

    async function fetchBooks() {

        try {
            const { data: { data: books } } = await axios.get(booksUrl)

            setBooks(books)

        } catch (error) {
            console.error(error);
        }

    }

    async function fetchCategories() {

        try {
            const { data: { data: categories } } = await axios.get(categoryUrl)

            setCategories(categories)

        } catch (error) {
            console.error(error);
        }

    }

    async function fetchAuthors() {

        try {

            const { data: { data: authors } } = await axios.get(autohrsUrl)

            setAuthors(authors)

        } catch (error) {
            console.error(error);
        }
    }


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
