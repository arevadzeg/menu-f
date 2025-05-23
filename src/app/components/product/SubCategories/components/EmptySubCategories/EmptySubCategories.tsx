import { InfoCircledIcon } from "@radix-ui/react-icons"



const EmptySubCategories = () => {

    // TODO HARD CORED COLORS

    return <span className="flex flex-col items-center p-4 bg-gray-100 rounded-md border border-gray-300">
        <div className="flex items-center text-gray-600">
            <span className="font-semibold">No subcategories added</span>
            <InfoCircledIcon className="mr-2 text-blue-500" />
        </div>
        <div className="mt-2 text-sm text-gray-500">
            <i>
                Subcategory is optional.
                <br />
                If not created, users won’t see anything.
            </i>
        </div>
    </span>
}


export default EmptySubCategories