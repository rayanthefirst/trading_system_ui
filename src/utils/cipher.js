export const encrypt_string = (str) => {
    let reversStr = str.split("").reverse();
    reversStr = reversStr.map((char) =>
        char.charCodeAt(0) * 3
    )

    return reversStr.join("<5>");  
}

export const decrypt_string = (str) => {
    const split_str = str.split("<5>");
    console.log("split_str", split_str)
    const split_str_arr = split_str.map((c) => String.fromCharCode(c/3));
    console.log("split_str_arr", split_str_arr)
    const finalStr = split_str_arr.reverse().join("");
    console.log("finalStr", finalStr)
    return finalStr;
}
