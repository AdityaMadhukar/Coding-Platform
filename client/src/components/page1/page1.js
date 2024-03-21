import { useState } from "react";
import CodeEditor from '@uiw/react-textarea-code-editor';
import axios from 'axios';
const Page1 = () => {
  const [formData, setFormData] = useState({
    username: '',
    language: 'cpp',
    code: '',
    stdin: ''
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    console.log(formData);
    await axios.post('http://localhost:8080/api/submit', formData)
      .then((res) => {
        console.log(res);
        alert("Submitted");
        
      })
      .catch((err) => {
        console.log(err);
      })
  }
  return (
    <div>
      <div class="h-[92vh] mx-auto bg-gray-900 p-5">
        <div className="flex flex-wrap mb-1">
          <div className="w-full md:w-1/2 md:pr-2 md:mb-0">
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={handleInputChange}
              name="username"
              className="w-full rounded bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block min-w-0 text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Bonnie Green"
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-2">
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Language</label>
            <select
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="js">JavaScript</option>
              <option value="py">Python</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
          >
            Submit
          </button>
        </div>
        <div className="flex flex-wrap mb-1">
          <div className="w-full md:w-2/3 md:pr-2 mb-1 md:mb-0">
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Source Code</label>
            <CodeEditor
              value={formData.code}
              // data-color-mode="dark"
              language={formData.language}
              onChange={handleInputChange}
              className="block p-2.5 w-full h-[70vh] bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              padding={15}
              style={{
                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
              }}
            />
          </div>
          <div className="w-full md:w-1/3 md:pl-2">
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Standard Input</label>
            <textarea
              rows="4"
              value={formData.stdin}
              onChange={handleInputChange}
              name="stdin"
              className="block p-2.5 w-full h-[70vh] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Input"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Page1;