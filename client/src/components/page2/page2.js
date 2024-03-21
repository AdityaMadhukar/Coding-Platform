import { useState, useEffect } from "react";
import axios from 'axios';
const Page2 = () => {
    const [submissions, setSubmissions] = useState();
    useEffect(() => {
        const fetchData = async() => {
            await axios.get('http://localhost:8080/api/submissions')
                .then((res)=>{
                    console.log(res);
                    setSubmissions(res.data);
                })
                .catch((err)=>{
                    console.log(err);
                })
        }
        fetchData();
    }, [])
    
    return (
        <div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-2">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Username
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Language
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Stdin
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Time
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions&&submissions.map((submission, key)=>(
                            <>
                            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {submission.username}
                                </th>
                                <td class="px-6 py-4">
                                    {submission.language}
                                </td>
                                <td class="px-6 py-4">
                                    {submission.stdin}
                                </td>
                                <td class="px-6 py-4">
                                    {submission.time}
                                </td>
                            </tr>
                            {/* {submission.code.substr(0,100)} */}
                            </>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
export default Page2;