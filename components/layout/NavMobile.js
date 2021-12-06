import { Link } from '@chakra-ui/layout';

function NavMobile({ data, h, color, onClick, fontSize }) {

    let colorDefault = "#fff"
    let heightDefault = "full"

    if (color) colorDefault = color
    if (h) heightDefault = h

    return (
        <Link
            onClick={onClick}
            href={data.url}
            display="flex"
            position="relative"
            alignItems="center"
            h={heightDefault}
            alignSelf="center"
            textTransform="uppercase"
            fontWeight="700"
            fontSize={fontSize}
            _before={{
                content: '""',
                position: "absolute",
                top: "100%",
                backgroundColor: colorDefault,
                width: "100%",
                height: "2px",
                transform: "scaleX(0)",
                transition: "all .3s ease"
            }}
            _hover={{
                _before: {
                    transform: "scaleX(1)"
                },
                color: colorDefault,
                textDecoration: "none",
            }}
            _focus={{
                _before: {
                    transform: "scaleX(1)"
                },
                color: colorDefault,
                textDecoration: "none",
                boxShadow: "none"

            }}
        >
            {data.title}
        </Link>
    );
}

export default NavMobile;