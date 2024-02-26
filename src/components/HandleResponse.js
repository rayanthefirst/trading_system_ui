import { useState, useEffect } from "react"

export const HandleResponse = ({isError, message}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!message) {
        setIsVisible(true);
    }

    const timer = setTimeout(() => {
        setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, isError]);

  if (!isVisible) return;

    return (
        <div className={`${isError ? "bg-red-500" : "bg-green-500"} border border-white-300`}>
            <p>{message}</p>
        </div>
    )
}