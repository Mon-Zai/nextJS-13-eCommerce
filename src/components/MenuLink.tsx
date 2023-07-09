import React from "react";
import Link from "next/link";

const MenuLink=(props:any)=>{
    let { href,children,...rest}=props;
    return(
        <Link 
        {...rest}
        href={href}>
            {children}
        </Link>
    )
}
export default React.forwardRef(MenuLink)