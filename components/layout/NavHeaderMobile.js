import { nanoid } from 'nanoid';
import XIcon from '@icons/XIcon';
import Github from '@icons/GithubIcon';
import NavMobile from './NavMobile';
import Twitter from '@icons/TwitterIcon';
import MenuIcon from '@icons/MenuIcon';
import Facebook from '@icons/FacebookIcon';
import { Image } from '@chakra-ui/image';
import Instagram from '@icons/InstagramIcon';
import { useState } from 'react';
import logo from '@images/logo-white2.png';
import { Box, Center, Stack } from '@chakra-ui/layout';
import ContainerSocialNetworks from '@components/ContainerSocialNetworks';

function NavHeaderMobile({ data }) {

    const [isOpen, setisOpen] = useState(false)
    const [sizeRight, setSizeRight] = useState(0)

    function setOpen() {
        setisOpen(true)
    }

    function setClose() {
        setisOpen(false)
    }

    function handleClick() {
        if (isOpen) {
            setSizeRight(1000)

            setTimeout(() => {
                setClose()
            }, 400);

        } else {
            setSizeRight(0)

            setOpen()

        }
    }

    const socialNetworks = [
        {
            id: nanoid(),
            socialNetwork: 'Facebook',
            iconSvg: <Facebook />,
            pl: '6px',
            url: 'https://www.facebook.com/nccarlosvargas/',
        },
        {
            id: nanoid(),
            socialNetwork: 'Instagram',
            iconSvg: <Instagram />,
            url: 'https://www.instagram.com/nc_cvargas',
        },
        {
            id: nanoid(),
            socialNetwork: 'Github',
            iconSvg: <Github />,
            url: 'https://github.com/Carlos-vargs',
        },
        {
            id: nanoid(),
            socialNetwork: 'Twitter',
            iconSvg: <Twitter />,
            url: 'https://twitter.com/nc_cvargas',
            pt: "2px"
        },
    ]

    return (
        <Center
            display={['flex', 'flex', 'flex', 'none', 'none']}
            alignItems="center"
            alignSelf="center"
        >
            <Box
                onClick={handleClick}
                cursor="pointer"
                h="40px" w="40px"
                title="open menu"
                color="white"
            >
                <MenuIcon />
            </Box>

            {
                isOpen && <Stack
                    className="animate__animated animate__fadeInRightBig"
                    position="absolute"
                    overflow="auto"
                    h="100vh"
                    zIndex="44"
                    left={`${sizeRight}px`}
                    transition="all 1s ease"
                    right="0" bottom="0"
                    top="0"
                    bgColor="red"
                    color="white"
                    justifyContent="flex-start"
                    alignItems="center"
                    pt={['24%', '6%', '6%', '24%', '24%']}
                    pb={['24%', '6%', '6%', '24%', '24%']}

                >
                    <Box position="absolute" w="38px" h="38px" right="39px" top="35px" onClick={handleClick} title="Close">
                        <XIcon />
                    </Box>

                    <Image
                        src={logo.src}
                        w="160px"
                        alt={'cyber book'}
                    />

                    <Stack pt="40px" fontSize="26px" gridGap="20px">
                        {
                            data.map(e => <NavMobile onClick={handleClick} color={'white'} fontSize="16px" key={e.id} h={'50px'} data={e} />)
                        }
                        <ContainerSocialNetworks data={socialNetworks} mtSize={'29px !important'} gap={'14px'} revert={true} />
                    </Stack>

                </Stack>
            }

        </Center>
    );
}

export default NavHeaderMobile;