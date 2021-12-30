import { Link } from '@chakra-ui/layout';

function NavMobile({ data, height, color, onClick, fontSize }) {

    return (
        <Link
            onClick={onClick}
            href={data.url}
            display="flex"
            position="relative"
            alignItems="center"
            h={height}
            alignSelf="center"
            textTransform="uppercase"
            fontWeight="700"
            fontSize={fontSize}
            _before={{
                content: '""',
                position: "absolute",
                top: "100%",
                backgroundColor: color,
                width: "100%",
                height: "2px",
                transform: "scaleX(0)",
                transition: "all .3s ease"
            }}
            _hover={{
                _before: {
                    transform: "scaleX(1)"
                },
                color: color,
                textDecoration: "none",
            }}
            _focus={{
                _before: {
                    transform: "scaleX(1)"
                },
                color: color,
                textDecoration: "none",
                boxShadow: "none"

            }}
        >
            {data.title}
        </Link>
    );
}

export default NavMobile;