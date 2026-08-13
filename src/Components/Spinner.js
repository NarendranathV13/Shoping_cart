import React from "react";
const Spinner = () => {
    return (
        <div className="flex justify-center mt-12">
            <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-indigo-600 rounded-full" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}
export default Spinner