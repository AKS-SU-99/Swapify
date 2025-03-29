import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import categories from './CategoriesList';
import './Category.css';
import { useState } from 'react';

function Categories(props){

const navigate = useNavigate();
const [tab,selectedTab] = useState("all");

    return (
        <div className='cat-container'>
            <div>
            <span className='pr-3'>All Categories</span>
                { categories && categories.length > 0 &&
                    categories.map( (item, index) => {
                        return (
                        <span 
                        onClick={() => navigate('/category/' + item)}
                        key={index} className='category'> {item} </span>
                    )
                })}
            </div>

        </div>
    )
}

export default Categories;

// import { useState } from "react";
// import { categoryArray } from "./CategoriesList";
// import { Box, VStack, HStack, Icon } from "@chakra-ui/react";
// import { BsChevronRight } from "react-icons/bs";

// const CategorySelection = ({ setCategory, setSubCategory, setCategorySelected }) => {
//     const [subcategoryArr, setSubcategoryArr] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState(null);

//     const handleCategoryClick = (category) => {
//         setSelectedCategory(category.cat_title);
//         setSubcategoryArr(category.sub_category);
//     };

//     const handleSubCategoryClick = (subCategory) => {
//         setCategory(selectedCategory);
//         setSubCategory(subCategory);
//         setCategorySelected(true);
//     };

//     return (
//         <VStack w="760px" margin="auto" mt={14} marginBottom="40px">
//             <Box fontSize="24px" fontWeight="bold" textAlign="center">
//                 CHOOSE A CATEGORY
//             </Box>
//             <HStack w="100%" spacing={0}>
//                 <VStack w="50%" spacing={0}>
//                     {categoryArray.map((elem) => (
//                         <Box
//                             key={elem.cat_id}
//                             border="1px solid #cecece"
//                             height="40px"
//                             width="100%"
//                             display="flex"
//                             alignItems="center"
//                             py={5}
//                             pl={3}
//                             cursor="pointer"
//                             _hover={{ bg: "#CECECE" }}
//                             onClick={() => handleCategoryClick(elem)}
//                         >
//                             <Icon as={BsChevronRight} fontSize="20px" />
//                             <Box w="85%">{elem.cat_title}</Box>
//                         </Box>
//                     ))}
//                 </VStack>
//                 <VStack w="50%" spacing={0}>
//                     {subcategoryArr.map((subcat, index) => (
//                         <Box
//                             key={index}
//                             w="100%"
//                             pl={4}
//                             border="1px solid #cecece"
//                             height="40px"
//                             display="flex"
//                             alignItems="center"
//                             py={5}
//                             cursor="pointer"
//                             _hover={{ bg: "#CECECE" }}
//                             onClick={() => handleSubCategoryClick(subcat)}
//                         >
//                             {subcat}
//                         </Box>
//                     ))}
//                 </VStack>
//             </HStack>
//         </VStack>
//     );
// };

// export default CategorySelection;