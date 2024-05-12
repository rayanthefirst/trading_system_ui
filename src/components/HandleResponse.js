export const HandleResponse = ({isSuccess, message, trigger}) => {
    return trigger ? (
        <div onClickOutside className={`border ${isSuccess ? "bg-green-500 border-green-800" : "bg-red-500 border-red-800"} text-white`}>
            <p>{message}</p>
        </div>
    ) : "";
}