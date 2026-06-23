import axios from "axios"
import { useEffect, useState } from "react"

const useCategories = () => {
    const [categories, setCategories] = useState([])

    const token = localStorage.getItem("token")

    const getCategory = async() => {
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/category`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        setCategories(result.data.data)
    }

    useEffect(() => {
        getCategory()
    }, [])

    return categories
}


export default useCategories