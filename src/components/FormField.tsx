type props = {
  htmlFor: string,
  text: string,
  type: string,
  id: string,
  placeholder?: string
}

const FormField = ({ htmlFor, text, type, id, placeholder = "" }: props) => {
  return (
    <div>
      <label htmlFor={htmlFor} className="block mb-2 text-sm font-medium text-black dark:text-white">{text}</label>
      <input type={type} name={id} id={id} className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
    </div>
  )
}

export default FormField