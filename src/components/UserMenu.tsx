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
        <Menu as="div" className="relative inline-block">
            <Menu.Button>
                {session.user?.id}
            </Menu.Button>
            <Menu.Items className="absolute right-0 w-56 origin-top-right shadow-lg bg-slate-500">
                <Menu.Item>
                    <MenuLink className="dropdown-link" href="/History">Order history</MenuLink>
                </Menu.Item>

                <Menu.Item>
                    <MenuLink className="dropdown-link" href="/Data">
                        User data
                    </MenuLink>
                </Menu.Item>

                <Menu.Item>
                    <a className="dropdown-link"
                        href="#"
                        onClick={logOutHandler}
                    >Logout</a>
                </Menu.Item>
            </Menu.Items>
        </Menu>
    )
}