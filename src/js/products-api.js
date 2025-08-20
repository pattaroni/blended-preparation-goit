import axios from "axios"
import { BASE_URL, ENDPOINTS } from "./constants"

export const fetchCategories = async() => {
    const { data } = await axios.get(ENDPOINTS.CATEGORIES) ;
    return data
}