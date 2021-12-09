import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Flex, Text } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import React from 'react';

function FormAuthor({ onChange, values, setNext }) {

    const countries = [
        { value: "ABW", country: "Aruba" },
        { value: "AFG", country: "Afghanistan" },
        { value: "AGO", country: "Angola" },
        { value: "AIA", country: "Anguilla" },
        { value: "ALA", country: "Aland Islands" },
        { value: "ALB", country: "Albania" },
        { value: "AND", country: "Andorra" },
        { value: "ARE", country: "United Arab Emirates" },
        { value: "ARG", country: "Argentina" },
        { value: "ARM", country: "Armenia" },
        { value: "ASM", country: "American Samoa" },
        { value: "ATA", country: "Antarctica" },
        { value: "ATF", country: "French Southern Territories" },
        { value: "ATG", country: "Antigua and Barbuda" },
        { value: "AUS", country: "Australia" },
        { value: "AUT", country: "Austria" },
        { value: "AZE", country: "Azerbaijan" },
        { value: "BDI", country: "Burundi" },
        { value: "BEL", country: "Belgium" },
        { value: "BEN", country: "Benin" },
        { value: "BES", country: "Bonaire, Sint Eustatius and Saba" },
        { value: "BFA", country: "Burkina Faso" },
        { value: "BGD", country: "Bangladesh" },
        { value: "BGR", country: "Bulgaria" },
        { value: "BHR", country: "Bahrain" },
        { value: "BHS", country: "Bahamas" },
        { value: "BIH", country: "Bosnia and Herzegovina" },
        { value: "BLM", country: "Saint Barthélemy" },
        { value: "BLR", country: "Belarus" },
        { value: "BLZ", country: "Belize" },
        { value: "BMU", country: "Bermuda" },
        { value: "BOL", country: "Bolivia (Plurinational State of)" },
        { value: "BRA", country: "Brazil" },
        { value: "BRB", country: "Barbados" },
        { value: "BRN", country: "Brunei Darussalam" },
        { value: "BTN", country: "Bhutan" },
        { value: "BVT", country: "Bouvet Island" },
        { value: "BWA", country: "Botswana" },
        { value: "CAF", country: "Central African Republic" },
        { value: "CAN", country: "Canada" },
        { value: "CCK", country: "Cocos (Keeling) Islands" },
        { value: "CHE", country: "Switzerland" },
        { value: "CHL", country: "Chile" },
        { value: "CHN", country: "China" },
        { value: "CIV", country: "Côte d'Ivoire" },
        { value: "CMR", country: "Cameroon" },
        { value: "COD", country: "Congo, Democratic Republic of the" },
        { value: "COG", country: "Congo" },
        { value: "COK", country: "Cook Islands" },
        { value: "COL", country: "Colombia" },
        { value: "COM", country: "Comoros" },
        { value: "CPV", country: "Cabo Verde" },
        { value: "CRI", country: "Costa Rica" },
        { value: "CUB", country: "Cuba" },
        { value: "CUW", country: "Curaçao" },
        { value: "CXR", country: "Christmas Island" },
        { value: "CYM", country: "Cayman Islands" },
        { value: "CYP", country: "Cyprus" },
        { value: "CZE", country: "Czechia" },
        { value: "DEU", country: "Germany" },
        { value: "DJI", country: "Djibouti" },
        { value: "DMA", country: "Dominica" },
        { value: "DNK", country: "Denmark" },
        { value: "DOM", country: "Dominican Republic" },
        { value: "DZA", country: "Algeria" },
        { value: "ECU", country: "Ecuador" },
        { value: "EGY", country: "Egypt" },
        { value: "ERI", country: "Eritrea" },
        { value: "ESH", country: "Western Sahara" },
        { value: "ESP", country: "Spain" },
        { value: "EST", country: "Estonia" },
        { value: "ETH", country: "Ethiopia" },
        { value: "FIN", country: "Finland" },
        { value: "FJI", country: "Fiji" },
        { value: "FLK", country: "Falkland Islands (Malvinas)" },
        { value: "FRA", country: "France" },
        { value: "FRO", country: "Faroe Islands" },
        { value: "FSM", country: "Micronesia (Federated States of)" },
        { value: "GAB", country: "Gabon" },
        { value: "GBR", country: "United Kingdom of Great Britain and Northern Ireland" },
        { value: "GEO", country: "Georgia" },
        { value: "GGY", country: "Guernsey" },
        { value: "GHA", country: "Ghana" },
        { value: "GIB", country: "Gibraltar" },
        { value: "GIN", country: "Guinea" },
        { value: "GLP", country: "Guadeloupe" },
        { value: "GMB", country: "Gambia" },
        { value: "GNB", country: "Guinea-Bissau" },
        { value: "GNQ", country: "Equatorial Guinea" },
        { value: "GRC", country: "Greece" },
        { value: "GRD", country: "Grenada" },
        { value: "GRL", country: "Greenland" },
        { value: "GTM", country: "Guatemala" },
        { value: "GUF", country: "French Guiana" },
        { value: "GUM", country: "Guam" },
        { value: "GUY", country: "Guyana" },
        { value: "HKG", country: "Hong Kong" },
        { value: "HMD", country: "Heard Island and McDonald Islands" },
        { value: "HND", country: "Honduras" },
        { value: "HRV", country: "Croatia" },
        { value: "HTI", country: "Haiti" },
        { value: "HUN", country: "Hungary" },
        { value: "IDN", country: "Indonesia" },
        { value: "IMN", country: "Isle of Man" },
        { value: "IND", country: "India" },
        { value: "IOT", country: "British Indian Ocean Territory" },
        { value: "IRL", country: "Ireland" },
        { value: "IRN", country: "Iran (Islamic Republic of)" },
        { value: "IRQ", country: "Iraq" },
        { value: "ISL", country: "Iceland" },
        { value: "ISR", country: "Israel" },
        { value: "ITA", country: "Italy" },
        { value: "JAM", country: "Jamaica" },
        { value: "JEY", country: "Jersey" },
        { value: "JOR", country: "Jordan" },
        { value: "JPN", country: "Japan" },
        { value: "KAZ", country: "Kazakhstan" },
        { value: "KEN", country: "Kenya" },
        { value: "KGZ", country: "Kyrgyzstan" },
        { value: "KHM", country: "Cambodia" },
        { value: "KIR", country: "Kiribati" },
        { value: "KNA", country: "Saint Kitts and Nevis" },
        { value: "KOR", country: "Korea, Republic of" },
        { value: "KWT", country: "Kuwait" },
        { value: "LAO", country: "Lao People's Democratic Republic" },
        { value: "LBN", country: "Lebanon" },
        { value: "LBR", country: "Liberia" },
        { value: "LBY", country: "Libya" },
        { value: "LCA", country: "Saint Lucia" },
        { value: "LIE", country: "Liechtenstein" },
        { value: "LKA", country: "Sri Lanka" },
        { value: "LSO", country: "Lesotho" },
        { value: "LTU", country: "Lithuania" },
        { value: "LUX", country: "Luxembourg" },
        { value: "LVA", country: "Latvia" },
        { value: "MAC", country: "Macao" },
        { value: "MAF", country: "Saint Martin (French part)" },
        { value: "MAR", country: "Morocco" },
        { value: "MCO", country: "Monaco" },
        { value: "MDA", country: "Moldova, Republic of" },
        { value: "MDG", country: "Madagascar" },
        { value: "MDV", country: "Maldives" },
        { value: "MEX", country: "Mexico" },
        { value: "MHL", country: "Marshall Islands" },
        { value: "MKD", country: "North Macedonia" },
        { value: "MLI", country: "Mali" },
        { value: "MLT", country: "Malta" },
        { value: "MMR", country: "Myanmar" },
        { value: "MNE", country: "Montenegro" },
        { value: "MNG", country: "Mongolia" },
        { value: "MNP", country: "Northern Mariana Islands" },
        { value: "MOZ", country: "Mozambique" },
        { value: "MRT", country: "Mauritania" },
        { value: "MSR", country: "Montserrat" },
        { value: "MTQ", country: "Martinique" },
        { value: "MUS", country: "Mauritius" },
        { value: "MWI", country: "Malawi" },
        { value: "MYS", country: "Malaysia" },
        { value: "MYT", country: "Mayotte" },
        { value: "NAM", country: "Namibia" },
        { value: "NCL", country: "New Caledonia" },
        { value: "NER", country: "Niger" },
        { value: "NFK", country: "Norfolk Island" },
        { value: "NGA", country: "Nigeria" },
        { value: "NIC", country: "Nicaragua" },
        { value: "NIU", country: "Niue" },
        { value: "NLD", country: "Netherlands" },
        { value: "NOR", country: "Norway" },
        { value: "NPL", country: "Nepal" },
        { value: "NRU", country: "Nauru" },
        { value: "NZL", country: "New Zealand" },
        { value: "OMN", country: "Oman" },
        { value: "PAK", country: "Pakistan" },
        { value: "PAN", country: "Panama" },
        { value: "PCN", country: "Pitcairn" },
        { value: "PER", country: "Peru" },
        { value: "PHL", country: "Philippines" },
        { value: "PLW", country: "Palau" },
        { value: "PNG", country: "Papua New Guinea" },
        { value: "POL", country: "Poland" },
        { value: "PRI", country: "Puerto Rico" },
        { value: "PRK", country: "Korea (Democratic People's Republic of)" },
        { value: "PRT", country: "Portugal" },
        { value: "PRY", country: "Paraguay" },
        { value: "PSE", country: "Palestine, State of" },
        { value: "PYF", country: "French Polynesia" },
        { value: "QAT", country: "Qatar" },
        { value: "REU", country: "Réunion" },
        { value: "ROU", country: "Romania" },
        { value: "RUS", country: "Russian Federation" },
        { value: "RWA", country: "Rwanda" },
        { value: "SAU", country: "Saudi Arabia" },
        { value: "SDN", country: "Sudan" },
        { value: "SEN", country: "Senegal" },
        { value: "SGP", country: "Singapore" },
        { value: "SGS", country: "South Georgia and the South Sandwich Islands" },
        { value: "SHN", country: "Saint Helena, Ascension and Tristan da Cunha" },
        { value: "SJM", country: "Svalbard and Jan Mayen" },
        { value: "SLB", country: "Solomon Islands" },
        { value: "SLE", country: "Sierra Leone" },
        { value: "SLV", country: "El Salvador" },
        { value: "SMR", country: "San Marino" },
        { value: "SOM", country: "Somalia" },
        { value: "SPM", country: "Saint Pierre and Miquelon" },
        { value: "SRB", country: "Serbia" },
        { value: "SSD", country: "South Sudan" },
        { value: "STP", country: "Sao Tome and Principe" },
        { value: "SUR", country: "Suriname" },
        { value: "SVK", country: "Slovakia" },
        { value: "SVN", country: "Slovenia" },
        { value: "SWE", country: "Sweden" },
        { value: "SWZ", country: "Eswatini" },
        { value: "SXM", country: "Sint Maarten (Dutch part)" },
        { value: "SYC", country: "Seychelles" },
        { value: "SYR", country: "Syrian Arab Republic" },
        { value: "TCA", country: "Turks and Caicos Islands" },
        { value: "TCD", country: "Chad" },
        { value: "TGO", country: "Togo" },
        { value: "THA", country: "Thailand" },
        { value: "TJK", country: "Tajikistan" },
        { value: "TKL", country: "Tokelau" },
        { value: "TKM", country: "Turkmenistan" },
        { value: "TLS", country: "Timor-Leste" },
        { value: "TON", country: "Tonga" },
        { value: "TTO", country: "Trinidad and Tobago" },
        { value: "TUN", country: "Tunisia" },
        { value: "TUR", country: "Turkey" },
        { value: "TUV", country: "Tuvalu" },
        { value: "TWN", country: "Taiwan, Province of China" },
        { value: "TZA", country: "Tanzania, United Republic of" },
        { value: "UGA", country: "Uganda" },
        { value: "UKR", country: "Ukraine" },
        { value: "UMI", country: "United States Minor Outlying Islands" },
        { value: "URY", country: "Uruguay" },
        { value: "USA", country: "United States of America" },
        { value: "UZB", country: "Uzbekistan" },
        { value: "VAT", country: "Holy See" },
        { value: "VCT", country: "Saint Vincent and the Grenadines" },
        { value: "VEN", country: "Venezuela (Bolivarian Republic of)" },
        { value: "VGB", country: "Virgin Islands (British)" },
        { value: "VIR", country: "Virgin Islands (U.S.)" },
        { value: "VNM", country: "Viet Nam" },
        { value: "VUT", country: "Vanuatu" },
        { value: "WLF", country: "Wallis and Futuna" },
        { value: "WSM", country: "Samoa" },
        { value: "YEM", country: "Yemen" },
        { value: "ZAF", country: "South Africa" },
        { value: "ZMB", country: "Zambia" },
        { value: "ZWE", country: "Zimbabwe" },
    ]

    return (
        <Flex
            px="20px"
            gridGap="30px"
            cursor="pointer"
            direction="column"
        >
            <Text as="span" textTransform="capitalize" >author</Text>
            <Input
                placeholder='First Name'
                size='md'
                type="text"
                required
                name={"first_name"}
                autoComplete={"given-name"}
                value={values.first_name}
                onChange={onChange}
            />
            <Input
                placeholder='Last Name'
                size='md'
                type="text"
                required
                name={"last_name"}
                autoComplete={"family-name"}
                value={values.last_name}
                onChange={onChange}
            />
            <Select
                placeholder='nationality'
                size='md'
                required
                name={"nationality"}
                value={values.nationality}
                onChange={onChange}
                textTransform="capitalize"
            >
                {
                    countries.map(e => <option key={nanoid()} value={e.value} >{e.country}</option>)
                }
            </Select>
            <Button
                mt="94px"
                maxW="100px"
                w="full"
                colorScheme='blue'
                textTransform="capitalize"
                ml="auto"
                onClick={() => setNext(1)}
            >
                next
            </Button>
        </Flex>
    );
}

export default FormAuthor;