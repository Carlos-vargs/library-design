import logo from '@images/logo1.png';
import { Image } from '@chakra-ui/image';
import { Flex } from '@chakra-ui/layout';
import style from '../styles/loader.module.css'

function Spinner() {
    return (
        <Flex h="100vh" w="full" justifyContent="center" alignItems="center" overflow="hidden">
        <Flex className={style.preloader}/>
        <Image
            w="140px"
            h="140px"
            objectFit="contain"
            src={logo.src}
            position="absolute"
        />
    </Flex>
    );
}

export default Spinner;