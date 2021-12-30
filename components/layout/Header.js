import { Center, Flex } from '@chakra-ui/layout';
import { nanoid } from 'nanoid';
import logo from '@images/logo-white2.png';
import { Image } from '@chakra-ui/image';
import NavHeader from './NavHeader';
import NavHeaderMobile from './NavHeaderMobile';

function Header() {

    const nav = [
        {
            id: nanoid(),
            title: "books",
            url: "#",
        },
        {
            id: nanoid(),
            title: "events",
            url: "#",
        },
        {
            id: nanoid(),
            title: "club",
            url: "#",
        },
        {
            id: nanoid(),
            title: "more",
            url: "#",
        },
    ]

    return (
        <Flex
            bgColor="blackColorHeader"
            justifyContent="center"
            w="full"
            h="100px"
            position="fixed"
            zIndex="44"
        >
            <Center
                h="full"
                w="full"
                maxW="1520px"
                justifyContent="space-between"
                px={['30px', '30px', '40px', '60px', '60px']}
            >
                <Image
                    src={logo.src}
                    alt="cyber book library"
                    w="136px"
                    h="90px"
                    objectFit="contain"
                />
                <NavHeader data={nav} />
                <NavHeaderMobile data={nav}  />
            </Center>
        </Flex>
    );
}

export default Header;