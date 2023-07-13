
import './UserMenu.component.css'
import { Menu } from "@headlessui/react";
import MenuLink from "./MenuLink";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
type menutitle = {
    session: Session
}


export default function UserMenu({ session }: menutitle) {


    const logOutHandler = () => {
        signOut({ callbackUrl: '/SignIn' })
    }
    return (
        <Menu as="div" className="relative inline-block translate-y- -translate-y-0.3">
            <Menu.Button>
                {session.user?.name}
            </Menu.Button>
            <Menu.Items className="absolute right-0 w-40 origin-top-right shadow-lg  menu">
                <Menu.Item>
                    <MenuLink className="dropdown-link px-7" href="/History">Order history</MenuLink>
                </Menu.Item>

                <Menu.Item>
                    <MenuLink className="dropdown-link px-10" href="/Data">
                        User data
                    </MenuLink>
                </Menu.Item>

                <Menu.Item>
                    <a className="dropdown-link px-12"
                        href="#"
                        onClick={logOutHandler}
                    >Logout</a>
                </Menu.Item>
            </Menu.Items>
        </Menu>
    )
}