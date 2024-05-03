interface props {
    
}

const FormField = ( {props}  : props) => {
  return (
    <div>
        <label htmlFor="" className="block mb-2 text-sm font-medium text-black dark:text-white">Password</label>
        <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required/>
     </div>
  )
}

export default FormField